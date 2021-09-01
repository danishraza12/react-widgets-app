import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Header from './components/Header'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const items = [
	{
		title: 'What is React?',
		content: 'React is a front end JavaScript library'
	},
	{
		title: 'Why do we use React?',
		content: 'React is very flexible'
	},
	{
		title: 'How do you use React?',
		content: 'React is used by creating components'
	}
]

const options = [
	{
		label: 'The Color Red',
		value: 'red'
	},
	{
		label: 'The Color Green',
		value: 'green'
	},
	{
		label: 'A shade of Blue',
		value: 'blue'
	}
]

const App = () => {
	const [selected, setSelected] = useState(options[0])

	return (
		// <div>
		<Router>
			<div>
				<Switch>
					<Route exact path="/accordion">
						<Accordion items={items} />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/translate">
						<Translate />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/search">
						<Search />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/dropdown">
						<Dropdown
							options={options}
							selected={selected}
							onSelectedChange={setSelected}
							label="Select a color"
						/>
					</Route>
				</Switch>
			</div>
		</Router>
		// </div>
	)
}

export default App;