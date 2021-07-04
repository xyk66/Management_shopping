import React, { Component } from 'react'

import {Form,Input,Tree} from 'antd'
import PropTypes from 'prop-types';
import menuList from '../../config/Menuconfig'

const Item = Form.Item;


export default class AuthForm extends Component {

    static propTypes = {
        role : PropTypes.object
    }

    constructor(props){
        super(props);
        
        const {menus} = this.props.role;
        this.state = {
            checkedKeys : menus
        }
    }

    //获取所有节点
    getTreeNodes = (menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push({title:item.title,key : item.key,children: item.children?this.getTreeNodes(item.children):null})
            // if(item.children){
            //     this.getTreeNodes(item.children);
            // }
            return pre;
        },[])
    }

    //   
    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        this.setState({checkedKeys})
      };

      //返回当前menus
      getmenus = ()=> this.state.checkedKeys

    //生命周期函数
    componentWillMount(){
        // const tem = [{title : '平台权限',key : 'all',children : []}]
        this.Ctree = this.getTreeNodes(menuList) 
    }
    //根据新传来的role来更新checkkeys的状态
    UNSAFE_componentWillReceiveProps(nextProps){
        const menus = nextProps.role.menus;
        this.setState({checkedKeys : menus});
    }

    render() {
        // console.log(this.treeData);
        //初始化树形结构
        const treeData = [
            {
              title: '平台权限',
              key: 'all',
              children:this.Ctree 
            }
          ];
          console.log(treeData);

          const {role} = this.props;
          const {checkedKeys} = this.state;
        //   console.log(role);

        return (
            <div>
                <Item label="角色名称">
                    <Input value={role.name} disabled/>
                </Item>

                <Tree
                checkable
                defaultExpandAll={true}
                treeData = {treeData}
                checkedKeys = {checkedKeys}
                onCheck={this.onCheck}
                />

            </div>
        )
    }
}
