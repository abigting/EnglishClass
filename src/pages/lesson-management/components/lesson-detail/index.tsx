import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload } from 'antd';
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

    const handleCancel = () => {
        props.closeModal()
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const coverFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

      const audioFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

      const videoFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

    return (
        <Modal title="新增课程" width={500} open={props.visible} onOk={handleOk} onCancel={() => handleCancel()} footer={null}>
            <Form
                className={styles['form-content']}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{ 'type': 'a', times: 3 }}
            >
                <Form.Item
                    label="课程名称"
                    name="name"
                    rules={[{ required: true, message: '请输入题目名称!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="课程类型"
                    name="type"
                    rules={[{ required: true, message: '请输入课程类型!' }]}
                >
                    <Radio.Group>
                        <Radio value="a">选择题(文字)</Radio>
                        <Radio value="b">选择题(音频)</Radio>
                        <Radio value="c">语音回答</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="播放次数"
                    name="times"
                    rules={[{ required: true, message: '请输入播放次数!' }]}
                >
                    <InputNumber min={1} precision={0} />
                </Form.Item>

                <Form.Item
                    label="封面"
                    name="cover"
                    valuePropName="fileList"
                    getValueFromEvent={coverFile}
                    rules={[{ required: true, message: '请上传封面资料!' }]}
                >
                    <Upload action="/upload.do" listType="picture-card" maxCount={1}>
                        <div>
                            <div style={{ marginTop: 8 }}>+ 上传</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="视频资料"
                    name="video"
                    valuePropName="videoList"
                    getValueFromEvent={videoFile}
                    rules={[{ required: true, message: '请上传视频资料!' }]}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <div style={{ marginTop: 8 }}>+ 上传</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="音频资料"
                    name="audio"
                    valuePropName="audioList"
                    getValueFromEvent={audioFile}
                    // rules={[{ required: true, message: '请上传音频资料!' }]}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
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
