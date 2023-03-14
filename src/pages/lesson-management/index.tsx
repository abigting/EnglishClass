import React, { useState } from 'react';
import Wrapper from '@/components/wrapper';
import { history } from 'umi';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import QuestionDetail from './components/question-detail';
import LessonDetail from './components/lesson-detail';
import styles from './index.less';

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

export default function LessonManagement() {

  const [lVisible, setlVisible] = useState(false)
  const [qVisible, setqVisible] = useState(false)

  const data: DataType[] = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

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
      width: '30%',
      key: 'action',
      render: (item) => <div>
        <a className={styles['form-action']} onClick={() => addQuestion(item)}>新增</a>

        <a className={styles['form-action']}>查看</a>

        <a className={styles['form-action']}>删除</a>
      </div>,
    },
  ];

  function addLesson() {
    setlVisible(true)
  }

  function addQuestion(item: DataType){
    console.log(item, 'item')
    setqVisible(true)
  }

  function closeLessonDetailModal(){
    setlVisible(false)
  }

  function closeQuestionDetailModal(){
    setqVisible(false)
  }

  return <Wrapper menus={[]}>
    <QuestionDetail visible={qVisible} closeModal={()=>closeQuestionDetailModal()}/>
    <LessonDetail visible={lVisible} closeModal={()=>closeLessonDetailModal()} />
    <div><Button size='middle' type="primary" onClick={() => addLesson()}>新增课程</Button></div>
    <Table dataSource={data} columns={columns} />
  </Wrapper>
}