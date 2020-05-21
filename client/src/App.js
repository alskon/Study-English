import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './Routes/PrivateRoute'
import PrivateAdminRoute from './Routes/PrivateAdminRoute'
import setAuthToken from './tokenToHeader'
import { loadingUser } from './actions/auth'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer';
import Main from './components/layout/Main';
import Auth from './components/Auth/Auth'
import Register  from './components/Register/Register'
import Units from './components/Units/Units'
import AddUnit from './components/Units/addUnit/AddUnit'
import Test from './components/Test/Test'
import AccountInformation from './components/AccountInformation/AccountInformation'
import AddTest from './components/Test/AddTest/AddTest'
import AddQuestion from './components/Test/Question/AddQuestion'
import Page404 from './components/Page404/Page404'

if(localStorage.token) setAuthToken(localStorage.token)

const App = () => {
  useEffect(()=> {
    store.dispatch(loadingUser())
  } , [])
  return (<Provider store = {store}>
    <Router>
      <Fragment>
        <Navbar />
          <Switch>
            <Route exact path='/' component={ Main } />
            <Route exact path='/login' component={ Auth } />
            <Route exact path='/register' component={ Register } />
            <PrivateRoute exact path='/units' component={ Units } />            
            <PrivateRoute exact path='/account' component={ AccountInformation } />
            <PrivateAdminRoute exact path='/add-unit' component = { AddUnit } />
            <PrivateAdminRoute exact path='/:unit_number/add-test' component = { AddTest } />
            <PrivateAdminRoute exact path='/test/:chapter/add-question' component= { AddQuestion } />
            <PrivateRoute exact path='/test/:chapter' component={ Test } />
            <Route path='*' component={ Page404 }/>
            
          </Switch>
        <Footer />
      </Fragment>
    </Router>
  </Provider>)
}

export default App;
