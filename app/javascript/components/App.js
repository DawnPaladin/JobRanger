import React from 'react';
import StatClicker from './StatClicker';

const App = (props) => {
	return <div className="stat-clickers">
		<div className="column">
			<StatClicker stat='STR' taskName='Job application' dailyCount={0} />
			<StatClicker stat='DEX' taskName='Resume' dailyCount={0} />
			<StatClicker stat='CON' taskName='Cover letter' dailyCount={0} />
		</div>
		<div className="column">
			<StatClicker stat='INT' taskName='Coding' dailyCount={0} />
			<StatClicker stat='WIS' taskName='Searching' dailyCount={0} />
			<StatClicker stat='CHA' taskName='Contact' dailyCount={0} />
		</div>
	</div>
}

export default App;
