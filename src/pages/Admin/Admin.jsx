import React, { Component } from 'react'
//路由相关
import { Redirect,Route,Switch} from 'react-router-dom'

import Home from '../Home/Home'
import Category from '../Category/Category'
import Product from '../Product/Product'
import Role from '../Role/Role'
import User from '../User/User'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'


//相关组件的引入
import Leftnav from '../../components/Left-nav/Leftnav'
import Header from '../../components/Header/Header'


//工具类
import memory from '../../utils/memory'

//antd相关引入
import { Layout } from 'antd';
// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Content, Footer, Sider } = Layout;

export default class Admin extends Component {

    render() {
        const user = memory.user;
        //判断内存中是否存储用户  判断用户是否登录
        if (!user || !user._id) {
            //重定向 跳转至登录页面
            return <Redirect to='/login' />
        }
        return (
                <Layout style={{height:"100%"}}>
                    <Sider>
                        <Leftnav/>
                    </Sider>
                    <Layout>
                        {/* <Header className="site-layout-sub-header-background" style={{ padding: 0,color:"red"}}>header</Header>
                         */}
                         <Header/>
                        <Content style={{ margin: 20,backgroundColor:'#fff'}}>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/Category" component={Category}/>
                                <Route path="/Product" component={Product}/>
                                <Route path="/Role" component={Role}/>
                                <Route path="/User" component={User}/>
                                <Route path="/bar" component={Bar}/>
                                <Route path="/line" component={Line}/>
                                <Route path="/Pie" component={Pie}/>
                                <Redirect to="/home"></Redirect>
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center',backgroundColor : "pink"}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
        )
    }
}
