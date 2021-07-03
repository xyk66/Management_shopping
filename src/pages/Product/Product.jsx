import React, { Component } from 'react'
import  './product.less'

//引入路由相关
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from './Home'
import AddUpdate from './AddUpdate'
import Detail from './Detail'


export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" exact component={Home}/>
                <Route path="/product/addupdate" component={AddUpdate}/>
                <Route path="/product/detail" component={Detail}/>
                <Redirect to="/product"/>
            </Switch>
        )
    }
}
