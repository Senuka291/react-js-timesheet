import './App.css';
import {Link, Switch, Route} from 'react-router-dom'
import ReportingForm from './components/ReportingForm'
import SignUpForm from './components/SignUpForm';
import Grant from "./components/Grant"
import Volunteer from "./components/Volunteer"
import React from 'react'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/form" component={ReportingForm}/>
        <Route path="/signin" component={SignUpForm} />
        <Route path="/grant" component={Grant}/>
        <Route path="/volunteer" component={Volunteer}/>
      </Switch>
    </div>
  );
}

export default App;
