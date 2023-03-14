// import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Input, Upload, InputNumber } from 'antd';
import styles from './index.less';

type onCancel = (a: number, b: number) => number

interface IProps {
    visible: boolean,
    closeModal: onCancel
}

export default function Add(props: IProps) {

    const handleOk = () => {
        props.closeModal();
    };

    const handleCancel = (type: string) => {
        console.log('Fiona')
        props.closeModal()
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const fileList = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Modal
            title="新增题目"
            footer={null}
            open={props.visible}
            onOk={handleOk}
            onCancel={() => handleCancel('question')}>
            <Form
                className={styles['form-content']}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{ 'type': 'a' }}
            >
                <Form.Item
                    label="题目名称"
                    name="username"
                    rules={[{ required: true, message: '请输入题目名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="播放顺序"
                    name="sort"
                    rules={[{ required: true, message: '请输入播放顺序!' }]}
                >
                    <InputNumber min={1} precision={0} />
                </Form.Item>
                <Form.Item
                    label="题目答案"
                    name="username"
                    rules={[{ required: true, message: '请输入题目名称!' }]}
                >
                    <Radio.Group>
                        <Radio value="a">A</Radio>
                        <Radio value="b">B</Radio>
                        <Radio value="c">C</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="题目文件"
                    name="cover"
                    valuePropName="fileList"
                    getValueFromEvent={fileList}
                    rules={[{ required: true, message: '请上传题目文件！' }]}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            {/* <PlusOutlined /> */}
                            <div style={{ marginTop: 8 }}>+ 上传</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item label="解说"
                    name="cover"
                    valuePropName="fileList"
                    getValueFromEvent={fileList}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            {/* <PlusOutlined /> */}
                            <div style={{ marginTop: 8 }}>+ 上传</div>
                        </div>
                    </Upload>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
