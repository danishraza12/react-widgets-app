import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
    const [ translated, setTranslated ] = useState('')
    const [ debouncedText, setDebouncedText ] = useState(text)

    //Preventing large number of requests by debouncing
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text)
        }, 500)

        return () => {
            clearTimeout(timerId)
        }
    }, [text])

    //requesting translation for users query
    useEffect(() => {
        const doTranslation = async () => {
            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            })

            setTranslated(data.data.translations[0].translatedText)
        }
        doTranslation()
        //component will re-render when language or debouncedText will change
    }, [language, debouncedText])

    return (
        <div>
            <h1 className="ui header">{ translated }</h1>
        </div>
    )
}

export default Convert;