import React, { useState } from 'react';
import { history } from 'umi';
import { Button, Modal, Radio, Form, Input, message, Upload, Table } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './register.less';

type onCancel = (a: number, b: number) => number


interface IProps {
    visible: boolean,
    closeModal: onCancel
}

export default function Index(props: IProps) {
    const [form] = Form.useForm();

    const handleOk = () => {
        props.closeModal();
    };

    const handleCancel = () => {
        props.closeModal()
    };


    const register = () => {
        form.validateFields()
            .then((values) => {
                console.log(values, 'values')
                if (!values.username) {
                    message.error('请输入用户名!')
                } else if (!values.password) {
                    message.error('请输入密码!')
                } else {
                    props.closeModal();
                }
            })
            .catch((errorInfo) => {
                console.log(errorInfo, 'errorInfo')
            });
    }
    return (
        <Modal
            className={styles['register-bg']}
            // style={{backgroundImage: `url(${backgroundImg})`,}}
            width={500}
            open={props.visible}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            footer={null}>
            <Form
                name="basic"
                className={styles['register-form']}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
                initialValues={{ 'type': 'a' }}
            >
                <Form.Item
                    label={<UserOutlined style={{ fontSize: 24 }} className={styles['login-form-icon']} />}
                    name="username"
                // rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input className={styles['login-form-input']} size="large" />
                </Form.Item>
                <Form.Item
                    label={<LockOutlined style={{ fontSize: 24 }} className={styles['login-form-icon']} />}
                    name="password"
                // rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input className={styles['login-form-input']} type="password" size="large" />
                </Form.Item>
                <Button className={styles['register-btn']} onClick={() => register()}>注册</Button>
            </Form>
        </Modal>
    );
}
