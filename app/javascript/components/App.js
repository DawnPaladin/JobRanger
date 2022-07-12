import React from 'react';
import StatClicker from './StatClicker';
import PointCounter from './PointCounter';

const App = (props) => {
	return <main>
		<div className="stat-clickers">
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
		<div className="point-counters">
			<PointCounter name="Today's points:" points={100} highScore={100}/>
			<PointCounter name="Week points:" points={100} highScore={100}/>
		</div>
	</main>
}

export default App;
