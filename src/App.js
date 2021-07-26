import Form from './components/Form'
import Room from './components/Room'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

const App = () =>
{
  return (
		<Router>
			<div className="nav_links">
				<Link to='/'>ROOM</Link>
				<Link to='/form'>FORM</Link>
			</div>
			<Switch>
				<Route exact path='/form'>
					<Form />
				</Route>
				<Route exact path='/'>
					<Room />
				</Route>
			</Switch>
		</Router>
	);
}

export default App
