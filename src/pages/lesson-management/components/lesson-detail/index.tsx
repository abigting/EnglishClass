import { Link, Outlet } from 'umi';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload, message, Row, Col } from 'antd';
import { LearningServices } from '@/services'
import styles from './index.less';

type onCancel = (a: number, b: number) => number


interface IProps {
    visible: boolean,
    uuid?: string;
    closeModal: onCancel
}

export default function Add(props: IProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (props.visible && props.uuid) {
            getInfo()
        }
    }, [props.visible]);

    function getInfo() {
        LearningServices.courseDetail({ uuid: props.uuid }).then(res => {
            if (res.code === 0 && res.data) {
                const { id, list, ...rest } = res.data;
                form.setFieldsValue({ ...rest})
            }
        })
    }

    const handleOk = async () => {

        // props.closeModal();
    };

    const handleCancel = () => {
        props.closeModal()
    };

    const getFormData = (obj: { [x: string]: string | Blob; }) => {
        return Object.keys(obj).reduce((pre, next) => {
            pre.append(next, obj[next]);
            return pre;
        }, new FormData());
    };

    const onFinish = async (values: any) => {
        setLoading(true)
        const { coverPath, videoPath, audioPath, ...rest } = values;
        let req = { ...rest }
        if (values.coverPath) {
            req = {
                ...req,
                coverPath: values?.coverPath?.originFileObj
            }
        }
        if (values.videoPath) {
            req = {
                ...req,
                videoPath: values?.videoPath?.originFileObj
            }
        }
        if (values.audioPath) {
            req = {
                ...req,
                audioPath: values?.audioPath?.originFileObj
            }
        }
        const formData = getFormData(req)
        const res = await LearningServices.courseCreate(formData);
        setLoading(false)
        if (res.code === 0) {
            message.success('保存成功');
            props.closeModal();
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const coverFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    const audioFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    const videoFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    return (
        <Modal title="新增课程"
            width={500}
            open={props.visible}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            afterClose={() => form.resetFields()}
            footer={null}>
            <div className={styles['form-wrapper']}>
                <Form
                    form={form}
                    className={styles['form-content']}
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{ name: 'test', type: 1, playTimes: 3, orderNum: 1 }}
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
                            <Radio value={1}>选择题(文字)</Radio>
                            <Radio value={2}>选择题(音频)</Radio>
                            <Radio value={3}>语音回答</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="播放顺序"
                                name="orderNum"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                                rules={[{ required: true, message: '请输入播放顺序!' }]}
                            >
                                <InputNumber min={1} precision={0} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="播放次数"
                                name="playTimes"
                                labelCol={{ span: 12 }}
                                wrapperCol={{ span: 12 }}
                                rules={[{ required: true, message: '请输入播放次数!' }]}
                            >
                                <InputNumber min={1} precision={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="封面"
                        name="coverPath"
                        valuePropName="coverPath"
                        getValueFromEvent={coverFile}
                    // rules={[{ required: true, message: '请上传封面资料!' }]}
                    >
                        <Upload accept="image/*" listType="picture-card" maxCount={1}>
                            <div>
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="视频资料"
                        name="videoPath"
                        valuePropName="videoPath"
                        getValueFromEvent={videoFile}
                    // rules={[{ required: true, message: '请上传视频资料!' }]}
                    >
                        <Upload accept="video/*" maxCount={1}>
                            <Button>+ 上传</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="音频资料"
                        name="audioPath"
                        valuePropName="audioList"
                        getValueFromEvent={audioFile}
                    // rules={[{ required: true, message: '请上传音频资料!' }]}
                    >
                        <Upload accept="audio/*" maxCount={1}>
                            <Button>+ 上传</Button>
                        </Upload>
                    </Form.Item>
                    {
                        !props.uuid &&
                        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                保存
                            </Button>
                        </Form.Item>
                    }
                </Form>
            </div>
        </Modal>
    );
}
