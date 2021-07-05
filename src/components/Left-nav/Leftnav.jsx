import React, { Component } from 'react'
import { Link,withRouter} from 'react-router-dom'


//引入图片
import Logo from '../../assets/img/logo.jpg'

//引入样式
import './index.less'

//引入导航菜单的数据
import MenuList from '../../config/Menuconfig.js'

import memory from '../../utils/memory'

//antd
import { Menu } from 'antd';

const { SubMenu } = Menu;





class Leftnav extends Component {
    //判断当前登录用户是否有权限
    hasAuth = (item)=>{
        const {key,isPublic} = item;
        const menus = memory.user.role.menus;
        const username = memory.user.username;

        if(username === 'admin' || isPublic || menus.indexOf(key) !== -1){
            return true;
        }else if(item.children){
           return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
        return false;
    }

    //根据menu的数据动态生成对应的标签
    renderAllList = (MenuList)=>{
        const path = this.props.location.pathname;
        return MenuList.reduce((pre,item) => {

            if(this.hasAuth(item)){
                if(!item.children){
                    // let icon = item.icon;
                    pre.push((<Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>))
                }else{
    
                    const Citem = item.children.find(Citem => path.indexOf(Citem.key) === 0);
                    if(Citem){
                        this.openKey = item.key;
                    }
                    pre.push((<SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            this.renderAllList(item.children)
                        }
                    </SubMenu>));
                }
              
            }
            return pre;
            
        },[])
    }

    componentWillMount(){
        this.MenuNodes = this.renderAllList(MenuList);
    }

    render() {

        //获得当前的路由路径
        //  console.log(this.props.location.pathname);

        let NowPath = this.props.location.pathname;
        if(NowPath.indexOf('/product') === 0){
            NowPath = '/product';
        }

        // 获得需要展开的openkey
        const openKey = this.openKey;

        return (
            <div className="LeftNav">
                <Link to="/home" className="Left-Logo">
                    <img src={Logo} alt="logo" />
                    <h1>Management</h1>
                </Link>

                <Menu
                    // defaultSelectedKeys={[NowPath]}
                    selectedKeys={[NowPath]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >

                    {
                        this.MenuNodes
                    }

                </Menu>
            </div>
        )
    }
}

//withRouter() 给非路由组件传递history location match
export default withRouter(Leftnav);
