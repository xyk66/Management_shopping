import React, { Component } from 'react'
import LinkButton from '../../components/LinkButton/LinkButton'
//product详情子路由

//引入相关请求
import {reqCategoryName} from '../../api/index'

//antd
import {Card,List} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
const Item = List.Item;

export default class Detail extends Component {

    //定义状态
    state = {
        Fname : '', //一级菜单的名称
        Sname : ''   ///二级菜单的名称
    }


    //生命周期函数
   async componentDidMount(){
        //获取当前分类的id
        const {pCategoryId,categoryId} = this.props.location.state.product;
        // console.log(pCategoryId,categoryId);
        if(pCategoryId === '0'){
            const result = await reqCategoryName(categoryId);
            this.setState({Fname : result.data.name});
        }else{
            //一次性发送多个请求 都成功后 处理
            const results = await Promise.all([reqCategoryName(pCategoryId),reqCategoryName(categoryId)])
            const Fname = results[0].data.name;
            const Sname = results[1].data.name;
            this.setState({Fname,Sname});
        }


    }


    render() {

        //读取传递过来的state数据
        // console.log(this.props.location.state.product);
        const {name,desc,price,detail,imgs} = this.props.location.state.product; 
        const {Fname,Sname} = this.state;
        //定义组件
        const title = (
            <span>
                <LinkButton>
                <ArrowLeftOutlined 
                style={{marginRight : 10,color : "#1da57a",fontSize:15}}
                onClick = {()=>this.props.history.goBack()}
                />
                </LinkButton>
                 
                 <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className="product_detail">
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>{Fname}{Sname?'-->'+Sname:Sname}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map(img =>(
                                    <img
                                    key = {img}
                                    src={"http://localhost:5000/upload/"+img}
                                    className = "product-img"
                                    alt="暂无"
                                    />
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
