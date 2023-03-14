import React, { useState } from 'react';
import { history } from 'umi';
import { Button, Modal, Radio, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Register from './register';

import styles from './index.less';


export default function Index() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  function Upload(e){
    console.log(e.target.value, 'e')
  }

  function getFile(){
   const file = document.getElementById('file');
   console.log(file, 'file')
  }

  function login(){
    form.validateFields()
    .then((values) => {
      console.log(values, 'values')
      if(!values.username){
        message.error('请输入用户名!')
      }else if(!values.password){
        message.error('请输入密码!')
      }else{
        history.push('/home')
      }
    })
    .catch((errorInfo) => {
      console.log(errorInfo, 'errorInfo')
    });
  }

  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['login-logo']}>
        <img src="https://auth.dayuan1997.com/img/l-login-logo.7a739a16.png" alt="login-logo" />
      </div>
      <div className={styles['login-inner']}>
        {/* <div className={styles['tab-box']}>
          <div className={styles['tab']}>
            密码登录
          </div>
        </div> */}
        <div className={styles['login-main']}>
          <Form
           form={form}
            name="basic"
            className={styles['login-form']}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ 'type': 'a', username:'test', password: '123456' }}
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

            <div className={styles['register']} onClick={() => setVisible(true)}><a>注册</a></div>
            <Button className={styles['login-btn']} onClick={() => login()}>立即登录</Button>
          </Form>
          <Register visible={visible} closeModal={()=> setVisible(false) }/>
          {/* <input type="file" id="file" onChange={e=>Upload(e)}/>
          <button onClick={()=>getFile()}>file</button> */}
        </div>
      </div>
    </div>
  );
}
