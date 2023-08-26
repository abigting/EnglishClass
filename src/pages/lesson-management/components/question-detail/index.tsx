import { useEffect, useState } from 'react';
import { Button, Modal, Radio, Form, Input, Upload, InputNumber, message } from 'antd';
import { LearningServices } from '@/services';
import utils from '@/utils';
import { ANSWER_OPTIONS } from '@/utils/config';
import styles from './index.less';

interface IProps {
    visible: boolean,
    course: any,
    uuid?: string | null | undefined;
    closeModal: any
}

export default function Add(props: IProps) {
    const [form] = Form.useForm();
    const [courseInfo, setCourseInfo] = useState<any>();
    const [loading, setLoading] = useState(false);
    const answerNum = Form.useWatch('answerNum', form);

    useEffect(() => {
        if (props.visible && props.uuid) {
            getInfo()
        } else if (props.visible) {
            setCourseInfo({ type: props.course?.type });
            getOrderNumberFn({courseUuid: props.course?.uuid})
        } else {
            setCourseInfo({})
        }
    }, [props.visible]);

    function getInfo() {
        LearningServices.titleDeatil({ uuid: props.uuid }).then(res => {
            if (res.code === 0 && res.data) {
                const { id, courseUuid, problemPath, interpretationPath, ...rest } = res.data;
                setCourseInfo({ courseUuid, type: rest.type })
                let data = rest;
                if (problemPath) {
                    data = {
                        ...data, problemPath: [{
                            uid: '1',
                            name: utils.getNameByUrl(problemPath),
                            status: 'done',
                            url: problemPath,
                        }]
                    }
                }
                if (interpretationPath) {
                    data = {
                        ...data, interpretationPath: [{
                            uid: '2',
                            name: utils.getNameByUrl(interpretationPath),
                            status: 'done',
                            url: interpretationPath,
                        }]
                    }
                }

                form.setFieldsValue({ ...data })
            }
        })
    }

    function getOrderNumberFn(params: any) {
        LearningServices.getOrderNumber(params).then(res => {
            if (res.code === 0 && res.data) {
                form.setFieldsValue({ orderNum: res.data })
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
        if (values.problemPath && values.problemPath[0]?.originFileObj) {
            req = {
                ...req,
                problemPath: values?.problemPath[0].originFileObj
            }
        }
        if (values.interpretationPath && values.interpretationPath[0]?.originFileObj) {
            req = {
                ...req,
                interpretationPath: values?.interpretationPath[0].originFileObj
            }
        }
        if (props.uuid) {
            req = {
                ...req,
                uuid: props.uuid,
                courseUuid: courseInfo?.courseUuid
            }
        }
        const formData = getFormData(req);

        if (props.uuid) {
            const res = await LearningServices.titleEdit(formData);
            setLoading(false)
            if (res.code === 0) {
                message.success('编辑成功');
                props.closeModal(true);
            }
        } else {
            const res = await LearningServices.titleCreate(formData);
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


    const problemPath = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e?.fileList?.length > 0) {
            e.fileList[0].status = 'done'
        }
        return e?.fileList;
    };


    const interpretationPath = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e?.fileList?.length > 0) {
            e.fileList[0].status = 'done'
        }
        return e?.fileList;
    };

    const needOptions = [1, 2].includes(props.course.type) || [1, 2].includes(courseInfo?.type);
    const notTextType = [2, 3].includes(props.course.type) || [2, 3].includes(courseInfo?.type);
    return (
        <Modal
            title="新增题目"
            footer={null}
            open={props.visible}
            onOk={handleOk}
            maskClosable={false}
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
                initialValues={{ 'name': '题目一', answer: 'A', answerNum: 3 }}
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
                    needOptions &&
                    <Form.Item
                        label="选项个数"
                        name="answerNum"
                        rules={[{ required: true, message: '题目选项个数!' }]}
                        extra="题目选项的个数，范围2-4项"
                    >
                        <InputNumber min={2} max={4} precision={0} />
                    </Form.Item>
                }
                {
                    needOptions &&
                    <Form.Item
                        label="题目答案"
                        name="answer"
                        rules={[{ required: true, message: '请输入题目名称!' }]}
                    >
                        <Radio.Group>
                            {
                                ANSWER_OPTIONS[answerNum || 3].map((option:string)=>
                                    <Radio value={option} key={option}>{option}</Radio>
                                    )
                            }
                        </Radio.Group>
                    </Form.Item>
                }
                {
                    notTextType &&
                    <Form.Item
                        label="题目文件"
                        name="problemPath"
                        valuePropName="fileList"
                        getValueFromEvent={problemPath}
                        rules={[{ required: true, message: '请上传题目文件！' }]}
                    >
                        <Upload accept="video/*" maxCount={1} disabled={!!props.uuid}>
                            <Button >+ 上传</Button>
                        </Upload>
                    </Form.Item>
                }
                {
                    !notTextType &&
                    <Form.Item
                        label="题目文件"
                        name="problemPath"
                        valuePropName="fileList"
                        getValueFromEvent={problemPath}
                        rules={[{ required: true, message: '请上传题目文件！' }]}
                    >
                        <Upload accept="image/*" listType="picture-card" maxCount={1} disabled={!!props.uuid}>
                            <div>
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item>
                }
                {
                    notTextType &&
                    <Form.Item label="解说"
                        name="interpretationPath"
                        valuePropName="fileList"
                        getValueFromEvent={interpretationPath}
                    >
                        <Upload accept="video/*" maxCount={1} disabled={!!props.uuid}>
                            <Button >+ 上传</Button>
                        </Upload>
                    </Form.Item>
                }
                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
