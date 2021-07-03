import React, { Component, createRef } from 'react'
import { Form, Input } from 'antd'


const Item = Form.Item;

export default class Add_form extends Component {
    formRef = createRef();

    render() {


        //指定表格的布局
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
          };

        return (

                <Form ref={this.formRef} {...layout}>

                    <Item label = "角色名称" name="roleName" initialValue='' rules={[
                        { required: true, message: '角色名称必须输入' },
                    ]}>
                        <Input placeholder="请输入角色名称" />
                    </Item>
                </Form>
        )
    }
}

