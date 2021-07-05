import React, { Component ,createRef} from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {formateDate} from '../../utils/GetDate'
import LinkButton from '../../components/LinkButton/LinkButton'

import {reqDeleteUser} from '../../api/index'

import Userform from './User_form'

//请求
import {reqUsers,reqAddUser} from '../../api/index'

//用户 路由
export default class User extends Component {

    addUpdateRef = createRef();

    state = {
        users : [], //所有用户的数组
        roles : [],//所有角色的数组
        isShow : false
    }

    //初始化
    intiColumns = ()=>{
        this.columns = [
            {title: '用户名',dataIndex : 'username'},
            {title: '邮箱',dataIndex : 'email'},
            {title: '电话',dataIndex : 'phone'},
            {title: '注册时间',dataIndex : 'create_time',
            render : formateDate
            },
            {title: '所属角色',dataIndex : 'role_id',
            render : (role_id) => {
                let name = "";
                for(var i = 0;i < this.state.roles.length;i++){
                    if(this.state.roles[i]._id === role_id){
                        name = this.state.roles[i].name;
                        break;
                    }
                }
                return name;
            }
            },
            {title: '操作',
            render : (user)=>{
                return (<span>
                    <LinkButton style={{marginRight:15}}>修改</LinkButton>
                    <LinkButton  onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
                </span>)
            }
            },
        ]
    }


    //添加或更新用户
    AddorUpdateUser = async()=>{
        this.setState({isShow:false});
        //收集表单数据
        const user = this.addUpdateRef.current.formRef.current.getFieldsValue();

        //清空列表框
        this.addUpdateRef.current.formRef.current.resetFields();

        //提交请求
        const res = await reqAddUser(user);
        if(res.status === 0){
            message.success("添加成功!")
            this.getUsers(); 
        }else{
            message.error("添加失败!")
        }
       
    }

    //获取所有用户列表
    getUsers = async()=>{
        const res = await reqUsers();
        
        if(res.status === 0){
            const {users,roles} = res.data
            this.setState({users,roles });
        }
    }


    //删除相关用户
    deleteUser = (user)=>{
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk : async ()=>{
                console.log(user._id);
                const res = await reqDeleteUser(user._id);
                if(res.status === 0){
                    message.success("删除成功!");
                    this.getUsers();
                }else{
                    message.error("删除失败!")
                }
            },
        });
    }

    //生命周期函数
    componentWillMount(){
        this.intiColumns();
    }

    componentDidMount(){
        this.getUsers();
    }
    render() {

        const {users,isShow,roles} = this.state;
        const title = <Button type="primary" onClick={()=>this.setState({isShow:true})}>创建用户</Button>
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={users}
                    columns = {this.columns}
                    pagination = {{defaultPageSize : 5}}
                />

                <Modal 
                title="添加用户" 
                visible={isShow}
                onOk = {this.AddorUpdateUser}
                onCancel = {()=> this.setState({isShow:false})}
                > 
                    <Userform roles = {roles} ref={this.addUpdateRef}/>
                </Modal>
            </Card>
        )
    }
}
