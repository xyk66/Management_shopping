import React, { Component } from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import './App.less';

import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Admin}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
