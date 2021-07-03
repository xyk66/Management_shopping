import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types';
import {Form,Input} from 'antd'


const Item = Form.Item;

export default class UpdateForm extends Component {
    formRef = createRef();

    static propTypes = {
        categoryName : PropTypes.string,
    }

    componentDidUpdate(){
        const {categoryName} = this.props;
        this.formRef.current.setFieldsValue({categoryName});
    }


    render() {
        const {categoryName} = this.props;

        return (
            <Form ref={this.formRef}>
            <Item name="categoryName" 
            initialValue={categoryName}
            rules={[
            { required: true, message: '分类名称必须输入' },
            ]}> 
            <Input placeholder="请输入分类名称"/>
            </Item>
        </Form>
        )
    }
}
