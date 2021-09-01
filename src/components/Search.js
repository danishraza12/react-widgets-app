import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [ term, setTerm ] = useState("programming")
	const [ results, setResults ] = useState([])
	const [ debouncedTerm, setDebouncedTerm ] = useState(term)

	const onInputChange = event => {
		setTerm(event.target.value)
	}

	useEffect(() => {
		// 1000ms timeout to stop API form making multiple requests
		// We can use timeoutID to reset/clear timer
		const timeoutID = setTimeout(() => {
			setDebouncedTerm(term)
		}, 1000);
		//This arrow function will not be invoked right away
		// but will run first when the useEffect is run again
		// and so on
		return () => {
			clearTimeout(timeoutID)
		}
	}, [term])

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: debouncedTerm
				}
			})
			setResults(data.query.search)
		}
		search()
	}, [debouncedTerm])

	const renderedResults = results.map(result => {
		return (
			<div key={result.pageid} className="item">
				<div className="right floated content">
					<a
						className="ui button"
						href={`https://en.wikipedia.org?curid=${result.pageid}`}
					>
						Go
					</a>
				</div>
				<div className="content">
					<div className="header">
						{result.title}
					</div>
					{/* dangerouslySetInnerHTML can be used to render HTML fetched from
					some other website but it might contain malicious code and false
					JavaScript which can be used to launch an XSS (Cross Site Scripting)
					attack, so this should not be used unless the source can be trusted */}
					<span dangerouslySetInnerHTML={{ __html: result.snippet }} ></span>
				</div>
			</div>
		)
	})

	return (
		<div>
			<div className="ui form">
				<div className="field">
					<label>Enter Search Text</label>
					<input
						value={term}
						onChange={onInputChange}
						className="input"
					/>
				</div>
			</div>
			<div className="ui celled list">
				{renderedResults}
			</div>
		</div>
	)
}

export default Search;