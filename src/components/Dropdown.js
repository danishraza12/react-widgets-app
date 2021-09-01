import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const onBodyClick = (event) => {
            // if the element that we have clicked on is inside
            // the main div so we need to close the dropdown
            if (ref.current.contains(event.target)) {
                return
            }
            setOpen(false)
        }

        document.body.addEventListener('click', onBodyClick, true)
        
        //This is only inplace for if we want to toggle the dropdown
        //on/off. We need to clear the ref or else we will get error
        return () => {
            document.body.removeEventListener('click', onBodyClick, true)
        }
    }, [])

    const renderedOptions = options.map(option => {
        if (option.value === selected.value) {
            return null;
        }
        return (
            //we have used onClick in here and not below as 
            //this is what is used to render the list
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        )
    })
    //After our component is rendered for the very first time we can
    //make use of it using ref.current
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div className={`ui selection dropdown ${open ? 'visible active' : ''}`} onClick={() => setOpen(!open)}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;