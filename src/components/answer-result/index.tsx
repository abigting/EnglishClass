import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Modal, Table } from 'antd';
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
    ]

    function handleOk() {

    }

    function handleCancel() {

    }

    return (
        <Modal title="答题记录" open={recordModalOpen} onOk={handleOk} onCancel={() => handleCancel()}>
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
