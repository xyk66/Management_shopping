import React, { Component } from 'react'
import { Link,withRouter} from 'react-router-dom'


//引入图片
import Logo from '../../assets/img/logo.jpg'

//引入样式
import './index.less'

//引入导航菜单的数据
import MenuList from '../../config/Menuconfig.js'

//antd
import { Menu } from 'antd';

const { SubMenu } = Menu;





class Leftnav extends Component {


    //根据menu的数据动态生成对应的标签
    renderAllList = (MenuList)=>{
        const path = this.props.location.pathname;
        return MenuList.map(item => {
            if(!item.children){
                // let icon = item.icon;
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }else{

                const Citem = item.children.find(Citem => path.indexOf(Citem.key) === 0);
                if(Citem){
                    this.openKey = item.key;
                }

                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {/* <Menu.Item key="2" icon={<MenuOutlined />}><Link to="/category">品类管理</Link></Menu.Item> */}
                        {
                            this.renderAllList(item.children)
                        }
                    </SubMenu>
                )
            }
        })
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
                    {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to="/home">首页</Link>
          </Menu.Item>
                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="2" icon={<MenuOutlined />}><Link to="/category">品类管理</Link></Menu.Item>
                        <Menu.Item key="3" icon={<MenuOutlined />}><Link to="/product">商品管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<TeamOutlined/>}>
                    <Link to="/user">用户管理</Link>
          </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                    <Link to="/role">角色管理</Link>
          </Menu.Item>
                    <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="6" icon={<BarChartOutlined />}>柱形图</Menu.Item>
                        <Menu.Item key="7" icon={<LineChartOutlined />}>折线图</Menu.Item>
                        <Menu.Item key="8" icon={<PieChartOutlined />}>饼图</Menu.Item>
                    </SubMenu> */}

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
