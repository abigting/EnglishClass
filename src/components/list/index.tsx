import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Table, Space } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import styles from './index.less';


interface DataType {
    key: React.ReactNode;
    name: string;
    age: number | string;
    address: string;
    children?: DataType[];
}

export default function List() {
    const [checkStrictly, setCheckStrictly] = useState(false);


    const columns: ColumnsType<DataType> = [
        {
            title: '课程名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '日期',
            dataIndex: 'age',
            key: 'age',
            width: '12%',
        },
        {
            title: '答案',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: '20%',
            key: 'action',
            render: (_, record) => (<Space size="middle">
                {
                    record.children && <a>新增</a>
                }
                <a>查看</a>
                <a>删除</a>
            </Space>),
        },
    ];

    const data: DataType[] = [
        {
            key: 1,
            name: '课程名称1',
            age: '2023-2-18',
            address: '',
            children: [
                {
                    key: 11,
                    name: '题目一',
                    age: '2023-2-18',
                    address: 'B',
                },
                {
                    key: 12,
                    name: '题目二',
                    age: '2023-2-18',
                    address: 'A',
                },
                {
                    key: 13,
                    name: '题目三',
                    age: '2023-2-18',
                    address: 'A',
                }
            ],
        },
        {
            key: 2,
            name: '课程名称2',
            age: '2023-2-18',
            address: '',
            children: [
                {
                    key: 21,
                    name: '题目一',
                    age: '2023-2-18',
                    address: 'C',
                },
                {
                    key: 22,
                    name: '题目二',
                    age: '2023-2-18',
                    address: 'A',
                },
                {
                    key: 23,
                    name: '题目三',
                    age: '2023-2-18',
                    address: 'A',
                }
            ],
        },
        {
            key: 3,
            name: '课程名称3',
            age: '2023-2-18',
            address: '',
            children: [
                {
                    key: 31,
                    name: '题目一',
                    age: '2023-2-18',
                    address: 'A',
                },
                {
                    key: 32,
                    name: '题目二',
                    age: '2023-2-18',
                    address: 'B',
                },
                {
                    key: 33,
                    name: '题目三',
                    age: '2023-2-18',
                    address: 'A',
                }
            ],
        },
    ];

    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    return (
        <div className={styles.navs}>
            <Table
                columns={columns}
                // rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={data}
            />
        </div>
    );
}
