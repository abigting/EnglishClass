import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/wrapper';
import { history } from 'umi';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LearningServices } from '@/services';
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
  const [data, setData] = useState([])
  const [lVisible, setlVisible] = useState(false)
  const [qVisible, setqVisible] = useState(false)

  useEffect(()=>{
      getList();
  }, [])

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
      // width: '30%',
      key: 'address',
    },
    {
      title: '播放次数',
      dataIndex: 'playTimes',
      // width: '30%',
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

  async function getList(){
    const res = await LearningServices.fetchCourselist();
    if(res.code === 0){
      setData(res.data)
    }
  }

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
    <Table rowKey="id" childrenColumnName="list" dataSource={data} columns={columns}  />
  </Wrapper>
}