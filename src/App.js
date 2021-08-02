import React, {useState} from 'react';
import Form from './components/Form'
import Room from './components/Room'
import Auth from './components/Auth'
import Account from './components/Account';
import Timer from './components/Timer'
import Input from './components/Input';
import Filter from './components/Filter'
import PrivateRoute from './components/PrivateRoute';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

const App = () =>
{
	const [token, setToken] = useState(localStorage.getItem('auth_token' || ''))
	const [user, setUser] = useState()
	const [one, setOne] = useState('')
	const [two, setTwo] = useState('')
	const [three, setThree] = useState('')
	return (
			<Router>
				<div className="nav_links">
					<Link to='/'>Auth</Link>
					<Link to='/room'>ROOM</Link>
					<Link to='/form'>FORM</Link>
					<Link to='/account'>Accounts</Link>
					<Link to='/input'>Input</Link>
					<Link to='/timer'>Timer</Link>
					<Link to='/filter'>Filter</Link>
				</div>
			<Switch>
					<Route exact path='/'>
						<Auth token={token} setToken={setToken} user={user} setUser={setUser}/>
					</Route>
					<Route exact path='/input'>
						<Input type='number' placeholder='Number'  inputvalue={one} setvalue={setOne}/>
						<Input type='date'  inputvalue={two} setvalue={setTwo}/>
						<Input type='text' placeholder='Text' inputvalue={three} setvalue={setThree} />
						<div>
							<p>Number: {one}</p>
							<p>Date: {two}</p>
							<p>Text: {three}</p>
						</div>
					</Route>
					<PrivateRoute exact path='/account' component={Account} token={token} user={user} />
					
					<Route exact path='/form'>
						<Form />
					</Route>
					<Route exact path='/room'>
						<Room />
					</Route>
					<Route exact path='/timer'>
						<Timer />
					</Route>
					<Route exact path='/filter'>
						<Filter />
					</Route>
				</Switch>
			</Router>
		);
	}

export default App
