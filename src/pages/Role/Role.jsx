import React, { Component,createRef } from 'react'

import {Card,Button,Table,Modal, message} from 'antd'

import { reqRoleList,reqAddRole,reqUpdateRole} from '../../api'

import memory from '../../utils/memory'
import {formateDate} from '../../utils/GetDate'
import storage from '../../utils/storage'

import AddForm from './add_form'
import AuthForm from './AuthForm'

export default class Role extends Component {

    addRef = createRef();

    updateRef = createRef();

    state = {
        roles : [], //所有角色的列表
        role : {},  //选中的角色
        flag : true,
        isShow : false, //是否显示添加
        isShowAuth : false,  //是否显示修改
    }

    //初始化列的函数
    initColumn = ()=>{
        this.columns = [
            {
                title: "角色名称",
                dataIndex : 'name'
            },{
                title: "创建时间",
                dataIndex : 'create_time',
                render : (create_time)=> formateDate(create_time)
            },{
                title: "授权时间",
                dataIndex : 'auth_time',
                render : (auth_time)=> auth_time ? formateDate(auth_time) : ""
            },
            {
                title: "授权人",
                dataIndex : 'auth_name'
            }
        ]
    }

    onrow = (role)=>{
        return {
            onClick : event => {
                this.setState({role,flag : false});
            }
        }
    }
    //发送请求
    getRoles = async()=>{
        const res =await reqRoleList();
        if(res.status === 0){
            const roles = res.data;
            this.setState({roles});
        }
    }

    //创建角色
    addRole = ()=>{
        // console.log(this.addRef.current.formRef);
        this.addRef.current.formRef.current.validateFields().then(async(val)=>{
            // console.log(err);
            if(val){
                // console.log(1111);

                this.setState({isShow : false});
                const {roleName} = val;

                this.addRef.current.formRef.current.resetFields();

                const res = await reqAddRole(roleName);
                // console.log(res)
                if(res.status === 0){
                    message.success("添加角色成功!");
                    // this.getRoles();
                    const role = res.data;
                   this.setState(state =>({
                       roles : [...state.roles,role]
                   }));
                }else{
                    message.error("添加角色失败!")
                }
            }
        });
    }
    //取消
    handleCancel = ()=>{
        this.addRef.current.formRef.current.resetFields();
        this.setState({isShow:false});
    }

    //设置角色权限
    UpdateRole = async()=>{
        const role = this.state.role;

        const menus = this.updateRef.current.getmenus();

        role.menus = menus;
        role.auth_time = Date.now();
        role.auth_name = memory.user.username;
        
        const res = await reqUpdateRole(role);

        this.setState({isShowAuth:false});
        if(res.status === 0){
           
            //如果当前更新的是自己角色的权限  强制退出
            if(role._id === memory.user.role_id){
                memory.user = {};
                storage.removeUser();
                this.props.history.replace('/login');
                message.info("当前用户角色权限已修改 请重新登录!");
            }else{
                this.setState({roles : [...this.state.roles],role});
            }
            
        }else{
            message.success("设置角色权限成功!");
        }

    }

    //生命周期函数
    componentWillMount(){
        this.initColumn();
    }

    componentDidMount(){
        //发送请求
        this.getRoles();
    }

    render() {

        const {roles,role,isShow,isShowAuth} = this.state;

        const title = (<span> 
            <Button type="primary" style={{marginRight : 15}} onClick={()=>this.setState({isShow:true})}>创建角色</Button>
            <Button type="primary" disabled = {this.state.flag} onClick={()=>this.setState({isShowAuth:true})}>设置角色权限</Button>
        </span>)
        return (
           <Card title={title}>
               <Table 
                dataSource={roles} 
                columns={this.columns} 
                rowSelection ={{type : 'radio',selectedRowKeys : [role._id],onSelect : role => this.setState({role})}}
                bordered 
                rowKey="_id" 
                pagination={{defaultPageSize:5}}
                onRow = {this.onrow}
               />

               <Modal 
               title ="创建角色"
               visible={isShow}
               onOk = {this.addRole}
               onCancel = {this.handleCancel}
               > 
                    <AddForm ref = {this.addRef}/>
               </Modal>

               <Modal 
               title="设置角色权限"
                visible={isShowAuth}
                onOk = {this.UpdateRole}
                onCancel = { () => {
                    this.setState({isShowAuth : false});
                }}
               >
                   <AuthForm role = {role} ref = {this.updateRef}/>
               </Modal>
           </Card>
        )
    }
}
