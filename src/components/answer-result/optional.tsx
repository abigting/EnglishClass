import { Link, Outlet } from 'umi';
import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LearningServices } from '@/services';
// import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';


interface DataType {
    key: React.ReactNode;
    titleName: string;
    userAnswerPath: string;
    userAnswer: string;
    children?: DataType[];
}

interface IProps {
    visible: boolean;
    courseUuid: string;
    closeModal: any
}

export default function Add(props: IProps) {

    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
        if (props.visible) {
            getInfo()
        }
    }, [props.visible])


    async function getInfo() {
        const res = await LearningServices.recordList({
            courseUuid: props.courseUuid
        });
        if (res.code === 0) {
            setData(res.data || [])
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '题目名称',
            dataIndex: 'titleName',
            key: 'titleName',
        },
        {
            title: '你的答案',
            dataIndex: 'userAnswer',
            width: '30%',
            key: 'userAnswer',
            render:(_, record)=><span>{record.userAnswer || '-'}</span>
        },
        {
            title: '正确答案',
            dataIndex: 'correctAnswer',
            width: '30%',
            key: 'correctAnswer',
        }
    ];

    function handleOk() {

    }

    function handleCancel() {
        props.closeModal()
    }

    return (
        <Modal title="答题记录"
            open={props.visible}
            footer={null}
            onCancel={() => handleCancel()}>
            <Table
              rowKey={'uuid'}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 500 }}
                // summary={() => (
                //     <Table.Summary fixed>
                //         <Table.Summary.Row>
                //             <Table.Summary.Cell rowSpan={3} index={0}></Table.Summary.Cell>
                //             <Table.Summary.Cell rowSpan={3} index={0}></Table.Summary.Cell>
                //             <Table.Summary.Cell rowSpan={3} index={0}>分数：80/100</Table.Summary.Cell>
                //         </Table.Summary.Row>
                //     </Table.Summary>
                // )}
            />
        </Modal>
    );
}
