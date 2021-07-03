import React, { Component,createRef} from 'react'
//product的添加和更新的子路由

//引入接口请求函数
import {reqCategory} from '../../api/index'

//照片墙
import PictureWall from './PictureWall'


import LinkButton from '../../components/LinkButton/LinkButton'

//引入antd
import {Form,Card,Input,Cascader,Button} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const {Item} = Form;
const {TextArea} = Input;







export default class AddUpdate extends Component {

    //创建ref对象
    form = createRef();
    pw = createRef();
    
    //组件自身的状态
    state = {
        optinos:[]
    }


    //收集数据发送请求
    finish = (values)=>{
        console.log(values);
        console.log(this.pw.current.getImgs());
    }

    //异步获取一级或二级分类列表
    getCategories = async(parentId)=>{
        const result = await reqCategory(parentId);
        if(result.status === 0){
            const categorys = result.data;
            if(parentId === 0){
                this.initOptions(categorys);
            }else{
                //二级列表
                return categorys
            }
            
        }
    }

    //初始化列表项
    initOptions = async(categorys)=>{
        const List = categorys.map(i=>({
            value : i._id,
            label : i.name,
            isLeaf : false
        }));

        //如果是一个二级商品分类的更新
        const {isUpdate,product} = this;
        const {pCategoryId} = product;
        if(isUpdate && pCategoryId!==0){
            //获取对应的二级分类列表
            const subList = await this.getCategories(pCategoryId);
            const childrenList = subList.map(i => ({
                value : i._id,
                label : i.name,
                isLeaf : true
            }))

            //找到当前对应商品的一级选项
            const targetOption = List.find(option => option.value === pCategoryId);
            //关联到对应的一级选项上
            targetOption.children = childrenList;
        }
        

        //更新状态
        this.setState({optinos:List});
    }

    //显示二级
     loadData = async(selectedOptions) => {
         //得到选择的option
        const targetOption = selectedOptions[0];
        //显示loading 
        targetOption.loading = true;
        //根据选中的分类去获取下一级的分类列表
        const subCategories = await this.getCategories(targetOption.value);
        targetOption.loading = false;
        if(subCategories && subCategories.length > 0){
            //生成二级列表
            const cOptinos = subCategories.map(i =>({
                value : i._id,
                label : i.name,
                isLeaf : true
            }));
            //关联到当前的options
            targetOption.children = cOptinos;
        }else{ //当前选中的分类没有二级分类
            targetOption.isLeaf = true;
        }
          this.setState({options : this.state.options});
      };


    //生命周期函数
    componentDidMount(){
        // console.log(this.form.current);
        this.getCategories(0);
    }

    componentWillMount(){
        //取出携带的state
        const product = this.props.location.state;
        //保存是否是更新的标识
        this.isUpdate = !!product;
        //保存商品信息
        this.product = product || {};
    }


    render() {
        //取出状态中的数据
        const {isUpdate,product} = this;

        const {categoryId,pCategoryId,imgs} = product;

        //用来接收级联分类的数组
        const categoryIDs = [];
        if(isUpdate){
            if(pCategoryId === 0){
                categoryIDs.push(categoryId);
            }else{
                categoryIDs.push(pCategoryId);
                categoryIDs.push(categoryId);
            }
        }

        // console.log(product);
        //指定表格的布局
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
          };

        //定义title
        const title = (
            <span>
                <LinkButton>
                <ArrowLeftOutlined 
                style={{marginRight : 10,color : "#1da57a",fontSize:15}}
                onClick = {()=>this.props.history.goBack()}
                />
                </LinkButton>
                <span>{isUpdate?"修改商品":"添加商品"}</span>
            </span>
        );

        return (
            <Card title={title}>
                <Form {...layout} ref={this.form} onFinish={this.finish}>
                    <Item label="商品名称" name="name" rules={[{required:true,message:"必须输入商品名称"}]} initialValue={product.name}>
                        <Input placeholder="请输入商品名称"/>
                    </Item>
                    <Item label="商品描述" name="desc" rules={[{required:true,message:"必须输入商品描述"}]} initialValue={product.desc}>
                    <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Item>
                    <Item label="商品价格" name="price" rules={[{required:true,message:"必须输入商品价格"},{
                        validator:(_,values)=>{
                            if(Number(values)>0){
                                return Promise.resolve();
                            }else{
                                return Promise.reject("必须大于0");
                            }
                        }
                    }]} initialValue={product.price}>
                    <Input type="number" addonAfter="元" placeholder="请输入商品价格"/>
                    </Item>
                    <Item label="商品分类" name="selectName" initialValue={categoryIDs} rules={[{required:true,message:"必须指定商品的分类"}]}>
                    <Cascader 
                    options={this.state.optinos} //需要显示的列表数据
                    loadData={this.loadData}             //当前选择的列表项  加载下一级的列表回调
                    placeholder="请指定商品分类"
                    >

                    </Cascader>
                    </Item>
                    <Item label="商品图片">
                    <PictureWall ref = {this.pw} imgs={imgs}/>
                    </Item>
                    <Item label="商品详情">
                    <Input placeholder="请输入商品名称"/>
                    </Item>
                    <Item>
                        <Button htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
