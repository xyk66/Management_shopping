import React, { Component,createRef} from 'react'

//引入组件
import LinkButton from '../../components/LinkButton/LinkButton'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

//引入antd
import { Card, Table, Button,message,Modal} from 'antd'
import { PlusCircleOutlined,ArrowRightOutlined} from '@ant-design/icons'

//请求相关
import {reqAddCategory, reqCategory,reqUpdateCategory} from '../../api/index.js'



export default class Category extends Component {
    formRef = createRef();
    upRef = createRef();
    state = {
        loading : false,
        categories : [], //一级分类列表
        subCategories : [], //二级分类列表
        parentId : '0', //当前需要显示 分类列表的id
        parentName : '', //分类列表 父类的名称
        showState : 0, //判断是否显示确认框 0:都不显示 1:显示添加  2:显示更新
     }

    //初始化表格列的数组
    initColumns = ()=>{
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (categories) => (
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(categories)}>修改分类</LinkButton>
                        {
                            this.state.parentId==='0'?<LinkButton onClick = {()=>this.showSubList(categories)}>查看子分类</LinkButton>:null
                        }
                    </span>
                )
            },
        ];
    }


    //获取列表的信息
    getCategories = async (asd)=>{
        this.setState({loading:true});

        //从state中获取parentId
        let  parentId = asd || this.state.parentId;

       const res =await reqCategory(parentId);
       this.setState({loading:false});
       if(res.status === 0){
           const categories = res.data;
        if(parentId === '0'){
            this.setState({categories});
        }else{
            this.setState({subCategories : categories});
        }
       }else{
        message.error("获取分类列表失败");
       }
    }

    //二级列表
    showSubList = (categories)=>{
        // console.log(categories);
        this.setState({parentId : categories._id,parentName:categories.name},()=>{
            this.getCategories();
        });
    }
    
    //显示一级分类列表
    showCategories = ()=>{
        this.setState({parentId:'0',parentName:'',subCategories:[]});
    }


    //点击取消  隐藏确定框
    handleCancel = ()=>{
        this.setState({showState : 0});
    }

    //显示添加确认框
    showAdd = ()=>{
        this.setState({showState :1});
    }
        
    //添加分类
    addCategory = ()=>{
        this.upRef.current.formRef.current.validateFields().then(async(values)=>{
            this.setState({showState :0});

            //收集数据  提交添加分类的请求
            const {parentId,categoryName} = values;
            // console.log(parentId,categoryName);
    
            //清除表单
            // this.upRef.current.formRef.current.resetField();
    
            const result = await reqAddCategory(categoryName,parentId);
            if(result.status === 0){
                if(parentId===this.state.parentId){
                    //重新获取分类列表显示
                 this.getCategories();
                }else if(parentId==='0'){
                    this.getCategories('0');
                }
            }
        }).catch(err => message.info('请输入分类名称'))
      
        
    }

    //显示更新确认框
    showUpdate = (categories)=>{
        //保存分类对象
        this.UpdateCat = categories;
        this.setState({showState : 2});
    }

    //更新分类
    UpdateCategory = ()=>{

        this.formRef.current.formRef.current.validateFields().then(async(values)=>{
                 //隐藏确认框
        this.setState({showState :0});

        //发送请求
        // console.log(this.UpdateCat._id);
        const categoryId = this.UpdateCat._id;
        // const categoryName = this.formRef.current.formRef.current.getFieldsValue().categoryName;
        const {categoryName} = values;

        //清除表单
        // this.formRef.current.formRef.current.resetField();

        const result = await reqUpdateCategory({categoryId,categoryName});
         if(result.status===0){
         this.getCategories();
        }
        
        }).catch(err => message.info('请输入分类名称'))

       
    }



    //生命周期函数
    componentWillMount(){
       this.initColumns();
    }

    //发送请求
    componentDidMount(){
        this.getCategories();
    }

    render() {

        //读取当前数据源
        const { categories,loading,parentId,subCategories,parentName,showState} = this.state;

        //读取指定的分类
        const updateCat = this.UpdateCat || {};
        
        //定义card左侧标题
        const title = parentId==='0'?'一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategories}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginRight : 10,marginLeft :10}}/>
                <span>{parentName}</span>
            </span>
        );

        //定义card右侧按钮
        const extra = (
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.showAdd}>
                添加
            </Button>
        )


        return (
            <>
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table dataSource={parentId === '0'?categories:subCategories} 
                columns={this.columns} 
                bordered rowKey="_id" 
                pagination={{defaultPageSize:5,showQuickJumper : true}}
                loading = {loading}
                />;
            </Card>

            <Modal title="添加分类" visible={showState===1} onCancel={this.handleCancel} onOk={this.addCategory}>
            <AddForm category={categories} parentId={parentId} ref={this.upRef}/>
            </Modal>

            <Modal title="更新分类" visible={showState===2} onCancel={this.handleCancel} onOk={this.UpdateCategory}>
            <UpdateForm categoryName = {updateCat.name?updateCat.name : ''} ref={this.formRef}/>
            </Modal>

            </>
        )
    }
}
