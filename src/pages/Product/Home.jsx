import React, { Component } from 'react'
import  {PAGE_SIZE} from '../../utils/constant'
//product 的默认子路由界面

//引入组件
import LinkButton from '../../components/LinkButton/LinkButton'

//引入接口请求函数
import {reqProducts,reqSearchProducts,reqUpdateProduct} from '../../api/index'

//antd相关
import { Card, Select, Input, Button, Table,message} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const Option = Select.Option;


export default class Home extends Component {

    state = {
        total : 0,   //商品的总数量
        products: [], //商品的数组
        loading : false,
        searchName : '',//搜索的关键字
        searchType : 'productName'  //搜索的类型  默认按照名称来搜索
     }


    //函数
    //初始化表格  列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render : (price)=>'￥'+ price  ///当前指定了对应的属性  传入的是对应的属性值
            },
            {
                width:100,
                title: '状态',
                // dataIndex: 'status',
                render : (product)=>{
                    const {_id,status} = product;
                    return (
                        <span>
                            <Button type="primary"
                             onClick={()=>this.UpdateProductStatus(_id,status===1?2:1)}>
                            {status===1?'下架':'上架'}
                            </Button>
                            <span>{status===1?'在售':'已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width:150,
                title: '操作',
                render : (product)=>{
                    return (
                        <span>
                            {/* 将product对象使用state传递给子路由组件 */}
                            <LinkButton style={{margin:'0 15px'}} onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                            <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    //获取指定页码的数据
    getproducts = async(pageNum)=>{
        this.pageNum = pageNum;  //保存当前pageNum
        this.setState({loading:true});

        const {searchType,searchName} = this.state;
        let result;
        //判断搜索关键字是否有值  如果有搜索分页
        if(searchName){
            result = await reqSearchProducts({pageNum,pageSize : PAGE_SIZE,searchName,searchType});
        }else{
            result = await reqProducts(pageNum,PAGE_SIZE);
        }
         this.setState({loading:false});
         if(result.status === 0){
            const {total,list} = result.data;
            this.setState({total,products : list});
         }
    }

    //更新商品的状态
    UpdateProductStatus = async(_id,status)=>{
        const result = await reqUpdateProduct(_id,status);
        if(result.status === 0){
            message.success('商品更新成功');
            this.getproducts(this.pageNum);
        }
    }

    //生命周期函数
    componentWillMount() {
        this.initColumns();
    }
    
    componentDidMount(){
        this.getproducts(1);
    }

    render() {

        //取出状态中的数组
        const { products,total,loading,searchType,searchName} = this.state;


        //定义组件
        const title = (
            <span>
                <Select value={searchType} style={{ width: 150 }} onChange={value => {this.setState({searchType:value})}}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字"
                style={{ width: 150, margin: '0 15px' }} 
                value={searchName} 
                onChange={e => {this.setState({searchName:e.target.value})}}/>
                <Button type="primary" onClick={()=>{this.getproducts(1)}}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={()=>this.props.history.push('/product/addupdate')}>添加商品</Button>
        )

        



        return (
            <Card title={title} extra={extra}>
                <Table 
                dataSource={products} 
                columns={this.columns} 
                loading={loading}
                rowKey='_id' 
                bordered
                pagination={{current : this.pageNum,defaultPageSize : PAGE_SIZE,showQuickJumper : true,total,
                    onChange : pageNum => {this.getproducts(pageNum)}
                }}
                />
            </Card>
        )
    }
}
