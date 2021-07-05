import React, { PureComponent, createRef } from 'react'
import { Form, Input,Select} from 'antd'
import PropTypes  from 'prop-types'


const Item = Form.Item;
const Option = Select.Option;

export default class User_form extends PureComponent {
    formRef = createRef();
    
    static propTypes ={
        roles : PropTypes.array.isRequired,
        user : PropTypes.object
    }

    render() {

        const {roles,user} = this.props;

        //指定表格的布局
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
          };

        return (

                <Form ref={this.formRef} {...layout}>

                    <Item label = "用户名" name="username" initialValue={user.username}>
                        <Input placeholder="请输入用户名" />
                    </Item>

                   {user._id?null: <Item label = "密码" name="password" initialValue={user.password}>
                        <Input placeholder="请输入密码" type="password"/>
                    </Item>}
                    <Item label = "手机号" name="phone" initialValue={user.phone}>
                        <Input placeholder="请输入手机号" />
                    </Item>
                    <Item label = "邮箱" name="email" initialValue={user.email}>
                        <Input placeholder="请输入邮箱" />
                    </Item>
                    <Item label = "角色" name="role_id" initialValue={user.role_id}>
                        <Select placeholder="请选择">
                            {
                                roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                            }
                        </Select>
                    </Item>
                </Form>
        )
    }
}

