import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
// import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';


interface DataType {
    key: React.ReactNode;
    name: string;
    address: string;
    answer: string;
    children?: DataType[];
}

export default function Add() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuestionModalOpen, setQuestionIsModalOpen] = useState(false);
    const [recordModalOpen, setRecordModalOpen] = useState(false);

    const columns: ColumnsType<DataType> = [
        {
            title: '题目名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '语音地址',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
        },
        // {
        //     title: '正确答案',
        //     dataIndex: 'answer',
        //     width: '30%',
        //     key: 'address',
        // }
    ];

    const data: DataType[] = [
        {
            key: 11,
            name: '题目一',
            answer: 'A',
            address: 'B',
        },
        {
            key: 12,
            name: '题目二',
            answer: 'A',
            address: 'A',
        },
        {
            key: 13,
            name: '题目三',
            answer: 'A',
            address: 'A',
        }
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showQuestionModal = () => {
        setQuestionIsModalOpen(true);
    };

    const showRecordModal = () => {
        setRecordModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = (type: string) => {
        if (type) {
            setQuestionIsModalOpen(false);
        }
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.navs}>
            <Button type="primary" onClick={showModal}>
                新增课程
            </Button>
            <Button type="primary" onClick={showQuestionModal}>
                新增题目
            </Button>

            <Button type="primary" onClick={showRecordModal}>
                答题记录
            </Button>
            <Modal title="新增题目" open={isQuestionModalOpen} onOk={handleOk} onCancel={() => handleCancel('question')}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
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

                    {/* <Form.Item
                        label="题目类型"
                        name="type"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Radio.Group>
                            <Radio value="a">选择题</Radio>
                            <Radio value="b">语音</Radio>
                            <Radio value="c">视频</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="播放次数"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <InputNumber />
                    </Form.Item> */}

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


                    {/* <Form.Item label="封面" name="cover" valuePropName="fileList" rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item> */}

                    <Form.Item label="题目文件" name="cover" valuePropName="fileList" rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                {/* <PlusOutlined /> */}
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="新增课程" open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel('class')}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{ 'type': 'a' }}
                >
                    <Form.Item
                        label="课程名称"
                        name="username"
                        rules={[{ required: true, message: '请输入题目名称!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="课程类型"
                        name="type"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Radio.Group>
                            <Radio value="a">选择题(文字)</Radio>
                            <Radio value="b">选择题(音频)</Radio>
                            <Radio value="c">语音回答</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="播放次数"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="视频资料" name="cover" valuePropName="videoList" rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    
                    <Form.Item label="音频资料" name="cover" valuePropName="audioList" rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item>


                    <Form.Item label="封面" name="cover" valuePropName="fileList" rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <div style={{ marginTop: 8 }}>+ 上传</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="答题记录" open={recordModalOpen} onOk={handleOk} onCancel={() => handleCancel('class')}>
                <Table
                    columns={columns}
                    // rowSelection={{ ...rowSelection, checkStrictly }}
                    dataSource={data}
                    pagination={false}
                    // summary={() => (
                    //     <Table.Summary fixed>
                    //         <Table.Summary.Row>
                    //             <Table.Summary.Cell  rowSpan={3} index={0}></Table.Summary.Cell>
                    //             <Table.Summary.Cell  rowSpan={3} index={0}></Table.Summary.Cell>
                    //             <Table.Summary.Cell  rowSpan={3} index={0}>分数：80/100</Table.Summary.Cell>
                    //         </Table.Summary.Row>
                    //     </Table.Summary>
                    // )}
                />
            </Modal>
        </div>
    );
}
