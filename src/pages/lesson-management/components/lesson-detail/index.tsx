import { useEffect, useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload, message, Row, Col } from 'antd';
import { LearningServices } from '@/services';
import utils from '@/utils';
import styles from './index.less';

interface IProps {
    visible: boolean,
    uuid?: string | null | undefined;
    closeModal: any
}

export default function Add(props: IProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.visible && props.uuid) {
            getInfo()
        } else {
            setLoading(false)
        }
    }, [props.visible]);

    function getInfo() {
        LearningServices.courseDetail({ uuid: props.uuid }).then(res => {
            if (res.code === 0 && res.data) {
                const { id, list, coverPath, videoPath, audioPath, followPath, ...rest } = res.data;
                let data = rest;
                if (coverPath) {
                    data = {
                        ...data, coverPath: [{
                            uid: '1',
                            name: utils.getNameByUrl(coverPath),
                            status: 'done',
                            url: coverPath,
                        }]
                    }
                }
                if (videoPath) {
                    data = {
                        ...data, videoPath: [{
                            uid: '2',
                            name: utils.getNameByUrl(videoPath),
                            status: 'done',
                            url: videoPath,
                        }]
                    }
                }
                if (audioPath) {
                    data = {
                        ...data, audioPath: [{
                            uid: '3',
                            name: utils.getNameByUrl(audioPath),
                            status: 'done',
                            url: audioPath,
                        }]
                    }
                }
                if (followPath) {
                    data = {
                        ...data, followPath: [{
                            uid: '4',
                            name: utils.getNameByUrl(followPath),
                            status: 'done',
                            url: followPath,
                        }]
                    }
                }
                form.setFieldsValue({ ...data })
            }
        })
    }

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
        if (values.coverPath && values.coverPath[0]?.originFileObj) {
            req = {
                ...req,
                coverPath: values?.coverPath[0].originFileObj
            }
        }
        if (values.videoPath && values.videoPath[0]?.originFileObj) {
            req = {
                ...req,
                videoPath: values?.videoPath[0].originFileObj
            }
        }
        if (values?.audioPath && values?.audioPath[0]?.originFileObj) {
            req = {
                ...req,
                audioPath: values?.audioPath[0].originFileObj
            }
        }
        if (values?.followPath && values?.followPath[0]?.originFileObj) {
            req = {
                ...req,
                followPath: values?.followPath[0].originFileObj
            }
        }
        if (props.uuid) {
            req = {
                ...req,
                uuid: props.uuid
            }
        }
        const formData = getFormData(req);
        if (props.uuid) {
            const res = await LearningServices.courseEdit(formData);
            setLoading(false)
            if (res.code === 0) {
                message.success('编辑成功');
                props.closeModal(true);
            }
        } else {
            const res = await LearningServices.courseCreate(formData);
            setLoading(false)
            if (res.code === 0) {
                message.success('保存成功');
                props.closeModal(true);
            }
        }
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const coverFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        if(e?.fileList?.length>0){
            e.fileList[0].status = 'done'
        }
        return e?.fileList;
    };

    const audioFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        if(e?.fileList?.length>0){
            e.fileList[0].status = 'done'
        }
        return e?.fileList;
    };

    const followPathFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        if(e?.fileList?.length>0){
            e.fileList[0].status = 'done'
        }
        return e?.fileList;
    };

    const videoFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        if(e?.fileList?.length>0){
            e.fileList[0].status = 'done'
        }
        return e?.fileList;
    };

    return (
        <Modal title="新增课程"
            width={500}
            maskClosable={false}
            open={props.visible}
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
                    initialValues={{ name: 'test', type: 1, playTimes: 3, showCount: false }}
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
                        label="题目数量"
                        name="showCount"
                        rules={[{ required: true, message: '请选择是否显示题目数量!' }]}
                    >
                        <Radio.Group>
                            <Radio value={true}>显示</Radio>
                            <Radio value={false}>不显示</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="coverPath"
                        valuePropName="fileList"
                        getValueFromEvent={coverFile}
                        rules={[{ required: true, message: '请上传封面资料!' }]}
                    >
                        <Upload accept="image/*" listType="picture-card" maxCount={1} disabled={!!props.uuid}>
                            <div>
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="视频资料"
                        name="videoPath"
                        valuePropName="fileList"
                        getValueFromEvent={videoFile}
                    // rules={[{ required: true, message: '请上传视频资料!' }]}
                    >
                        <Upload accept="video/*" maxCount={1} disabled={!!props.uuid}>
                            <Button>+ 上传</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="音频资料"
                        name="audioPath"
                        valuePropName="fileList"
                        getValueFromEvent={audioFile}
                    // rules={[{ required: true, message: '请上传音频资料!' }]}
                    >
                        <Upload accept="audio/*" maxCount={1} disabled={!!props.uuid}>
                            <Button>+ 上传</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="跟读资料"
                        name="followPath"
                        valuePropName="fileList"
                        getValueFromEvent={followPathFile}
                    >
                        <Upload accept="video/*" maxCount={1} disabled={!!props.uuid}>
                            <Button>+ 上传</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}
