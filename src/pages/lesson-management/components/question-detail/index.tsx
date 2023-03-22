import { useEffect, useState } from 'react';
import { Button, Modal, Radio, Form, Input, Upload, InputNumber, message } from 'antd';
import { LearningServices } from '@/services'
import styles from './index.less';

type onCancel = (a: number, b: number) => number

interface IProps {
    visible: boolean,
    course: any,
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
        LearningServices.titleDeatil({ uuid: props.uuid }).then(res => {
            if (res.code === 0 && res.data) {
                const { id, courseUuid, ...rest } = res.data;
                form.setFieldsValue({ ...rest })
            }
        })
    }

    const handleOk = () => {
        props.closeModal();
    };

    const handleCancel = (type: string) => {
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
        const { problemPath, interpretationPath, ...rest } = values;
        let req = { ...rest, courseUuid: props.course.uuid };
        if (values.problemPath) {
            req = {
                ...req,
                problemPath: values?.problemPath?.originFileObj
            }
        }
        if (values.interpretationPath) {
            req = {
                ...req,
                interpretationPath: values?.interpretationPath?.originFileObj
            }
        }
        const formData = getFormData(req)
        const res = await LearningServices.titleCreate(formData);
        setLoading(false)
        if (res.code === 0) {
            message.success('保存成功');
            props.closeModal(true);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const problemPath = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };


    const interpretationPath = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    return (
        <Modal
            title="新增题目"
            footer={null}
            open={props.visible}
            onOk={handleOk}
            afterClose={() => form.resetFields()}
            onCancel={() => handleCancel('question')}>
            <Form
                className={styles['form-content']}
                form={form}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{ 'name': '题目一', orderNum: 1, answer: 'A' }}
            >
                <Form.Item
                    label="题目名称"
                    name="name"
                    rules={[{ required: true, message: '请输入题目名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="播放顺序"
                    name="orderNum"
                    rules={[{ required: true, message: '请输入播放顺序!' }]}
                >
                    <InputNumber min={1} precision={0} />
                </Form.Item>
                {
                    props.course.type !== 3 &&
                    <Form.Item
                        label="题目答案"
                        name="answer"
                        rules={[{ required: true, message: '请输入题目名称!' }]}
                    >
                        <Radio.Group>
                            <Radio value="A">A</Radio>
                            <Radio value="B">B</Radio>
                            <Radio value="C">C</Radio>
                        </Radio.Group>
                    </Form.Item>
                }


                <Form.Item
                    label="题目文件"
                    name="problemPath"
                    valuePropName="problemPath"
                    getValueFromEvent={problemPath}
                    rules={[{ required: true, message: '请上传题目文件！' }]}
                >
                    <Upload maxCount={1}>
                        <Button >+ 上传</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="解说"
                    name="interpretationPath"
                    valuePropName="interpretationPath"
                    getValueFromEvent={interpretationPath}
                >
                    <Upload maxCount={1}>
                        <Button >+ 上传</Button>
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
        </Modal>
    );
}
