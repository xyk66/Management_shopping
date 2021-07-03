import React, { Component, createRef } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types';


const Item = Form.Item;
const Option = Select.Option;

export default class AddForm extends Component {
    formRef = createRef();
    static propTypes = {
        category: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired
    }

    componentDidUpdate() {
        if (this.formRef.current !== null) {
            this.formRef.current.resetFields();
        }
        const { parentId } = this.props;
        this.formRef.current.setFieldsValue({ parentId });
    }

    render() {

        const { category, parentId } = this.props;

        return (

            <div>
                <Form ref={this.formRef}>
                    <Item name="parentId" initialValue={parentId}>
                        <Select>
                            <Option value="0">一级分类</Option>
                            {
                                category.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                            }
                        </Select>
                    </Item>

                    <Item name="categoryName" initialValue='' rules={[
                        { required: true, message: '分类名称必须输入' },
                    ]}>
                        <Input placeholder="请输入分类名称" />
                    </Item>
                </Form>
            </div>
        )
    }
}
