import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

//样式
import './index.less'

//其他工具类
import Memory from '../../utils/memory'
import storage from '../../utils/storage.js'
import MenuList from '../../config/Menuconfig.js'

import logo from '../../assets/img/logo.jpg'

import { formateDate } from '../../utils/GetDate.js'

//antd相关
import { Modal } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';


//组件
import LinkButton from '../../components/LinkButton/LinkButton'

class Header extends Component {

    state = {
        date: formateDate(Date.now()),
        weather : ""
    }


    //获取当前时间
    gettime = () => {
        this.InterId = setInterval(() => {
            const date = formateDate(Date.now());
            this.setState({ date })
        }, 1000);
    }

    //动态获取标题
    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        MenuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const Citem = item.children.find(citem => path.indexOf(citem.key) === 0);
                if (Citem) {
                    title = Citem.title;
                }
            }
        });
        return title;
    }

    //退出
    exit = () => {
        Modal.confirm({
            // icon: <ExclamationCircleOutlined />,
            content: '确定退出吗？',
            //确定退出清除数据 并跳转到登录界面
            onOk : () => {
            //   console.log('确定');
                storage.removeUser();
                Memory.user = {};
                this.props.history.replace('/login');
            }
          })
    }

    //页面首页渲染时 挂到页面
    componentDidMount() {
        this.gettime();
        var xhr = new XMLHttpRequest();

        new Promise((resolve,reject) => {
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(xhr.responseText)
                    }else{
                        reject("错误!");
                    }
                }
            }
            xhr.open("GET","https://restapi.amap.com/v3/weather/weatherInfo?key=de027e159d41ae65add9dc230560e169&city=420502&extensions=all&output=JSON",true);
            xhr.send(null);
        }).then(value => {
            // console.log(value);
            var weather = JSON.parse(value).forecasts[0].casts[0].dayweather;
            this.setState({weather});
            // console.log(weather);
        }).catch(err => {
            console.error(err);
        });

        
    }

    //页面卸载时 卸载定时器
    componentWillUnmount(){
        clearInterval(this.InterId);
    }


    render() {
        // console.log(Memory.user.username);

        const user = Memory.user.username;

        const { date } = this.state;
        // console.log(this.state.weather);

        //获取当前需要显示的标题
        const Nowtitle = this.getTitle();

        return (
            <header>
                <div className="headerTop">
                    <span>欢迎,{user}</span>
                    <LinkButton onClick={this.exit}>退出</LinkButton>
                </div>
                <div className="headerBottom">
                    <div className="hB-left">{Nowtitle}</div>
                    <div className="hB-right">
                        <span>
                            {date}
                        </span>
                        <img src={logo} alt="" />
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)
