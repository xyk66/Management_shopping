import {
    PieChartOutlined,
    MenuOutlined,
    BarChartOutlined,
    LineChartOutlined,
    AreaChartOutlined,
    UserOutlined,
    TeamOutlined,
    AppstoreOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title:'首页', //标题名称
        key : '/home', //路由
        icon : <PieChartOutlined/>, //图标名称
        isPublic : true //是否公开
    },
    {
        title:'商品', //标题名称
        key : '/products', //路由
        icon : <AppstoreOutlined/>, //图标名称
        children : [
            {
                title:'品类管理', //标题名称
                key : '/category', //路由
                icon : <MenuOutlined/> //图标名称
            },
            {
                title:'商品管理', //标题名称
                key : '/product', //路由
                icon : <MenuOutlined/> //图标名称
            }
        ]
    },
    {
        title:'用户管理', //标题名称
        key : '/user', //路由
        icon : <TeamOutlined/> //图标名称
    },
    {
        title:'角色管理', //标题名称
        key : '/role', //路由
        icon : <UserOutlined/> //图标名称
    },
    {
        title:'图形图表', //标题名称
        key : '/charts', //路由
        icon : <AreaChartOutlined/>, //图标名称
        children : [
            {
                title:'柱形图', //标题名称
                key : '/bar', //路由
                icon : <BarChartOutlined/> //图标名称
            },
            {
                title:'折线图', //标题名称
                key : '/line', //路由
                icon : <LineChartOutlined/> //图标名称
            },
            {
                title:'饼图', //标题名称
                key : '/pie', //路由
                icon : <PieChartOutlined/>
            }
        ]
    },
];
export default menuList