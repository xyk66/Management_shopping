import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reLogin} from '../../api/index'
import memory from '../../utils/memory'
import storage from '../../utils/storage'

//引入组件
import Admin from '../Admin/Admin'

//http://120.55.193.14:5000/login


class Login extends Component {

 onFinish = async (values) => {
          const {username, password} = values;
          const result = await reLogin(username,password);
          if(!result.status){
            message.success("登录成功！");

            //保存在内存中
            const user = result.data;
            memory.user = user;

            //保存到本地
            storage.saveUser(user);

            //路由跳转
            this.props.history.replace("/");
          }else{
            message.error(result.msg);
          }
        
        };

  render() {

    //判断用户是否登录 如果已经登录直接进入用户界面
    const nowUser = memory.user;
    if(nowUser && nowUser._id){
      return <Redirect to="/" Component={Admin}/>
    }

    return (
      <div>
            <h1>用户登录</h1>
            <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              whitespace : true,
              message: 'Please input your Username!',
            },
            {
              min: 4,
              message: '用户名最少四位',
            },
            {
              max: 12,
              message: '用户名最多12位',
            },
            {
              pattern : /^[a-zA-Z0-9_]+$/,
              message : "用户名必须由数字字母下划线"
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>

        </Form.Item>
      </Form>
        </div>
    )
  }
}
  export default Login
