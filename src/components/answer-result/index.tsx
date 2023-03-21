import { Link, Outlet } from 'umi';
import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LearningServices } from '@/services';
// import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';


interface DataType {
    key: React.ReactNode;
    name: string;
    address: string;
    answer: string;
    children?: DataType[];
}

interface IProps {
    visible: boolean;
    courseUid: string;
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
            courseUid: props.courseUid
        });
        if (res.code === 0) {
            setData(res.data || [])
        }
    }

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
    );
}
