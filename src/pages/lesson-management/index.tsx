import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/wrapper';
import { Table, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { LearningServices } from '@/services';
import QuestionDetail from './components/question-detail';
import LessonDetail from './components/lesson-detail';
import styles from './index.less';

interface DataType {
  type: JSX.Element;
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
  const [currentCourse, setCurrentCourse] = useState<any>({})
  const [titleUuid, setTitleUuid] = useState<string | null>()
  const [courseUuid, setCourseUuid] = useState<string | null>()

  useEffect(() => {
    getList();
  }, [])

  const QUESTION_TYPE = {
    1: '选择题(文字)',
    2: '选择题(音频)',
    3: '语音回答'
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      width: '26%',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: '12%',
      render: (text) => <div>
        {QUESTION_TYPE[Number(text)]}
      </div>
    },
    {
      title: '日期',
      dataIndex: 'updateTime',
      key: 'updateTime',
      // width: '12%',
      render: (updateTime) => <div>
        {updateTime ? dayjs(updateTime).format('DD/MM/YYYY HH:mm') : '-'}
      </div>
    },
    {
      title: '播放次数',
      dataIndex: 'playTimes',
      width: '100px',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '30%',
      key: 'action',
      render: (_, record) => <div>
        {
          record.type && <a className={styles['form-action']} onClick={() => addQuestion(record)}>新增题目</a>
        }
        <a className={styles['form-action']} onClick={() => reviewDeatil(record)}>查看</a>
        <Popconfirm
          title="确定要删除吗？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteConfirm(record)}
        >
          <a className={styles['form-action']}>删除</a>
        </Popconfirm>
      </div>,
    },
  ];

  async function deleteConfirm(record: {
    [x: string]: any; uuid: string;
  }) {
    let res;
    if (record.type) {
      res = await LearningServices.courseDelete({ uuid: record.uuid });
    } else {
      res = await LearningServices.titleDelete({ uuid: record.uuid });
    }
    if (res.code === 0) {
      message.success('删除成功');
      getList();
    }
  }

  async function getList() {
    const res = await LearningServices.fetchCourselist();
    if (res.code === 0 && res.data) {
      res.data.forEach((s: { list: string | any[]; }) => {
        if (s.list?.length === 0) {
          delete s.list
        }
      })
      setData(res.data)
    }
  }

  function addLesson() {
    setlVisible(true)
  }

  function addQuestion(item: DataType) {
    setCurrentCourse(item)
    setqVisible(true)
  }

  function reviewDeatil(item: DataType) {
    if (item.type) {
      setlVisible(true);
      setCourseUuid(item.uuid)
    } else {
      setqVisible(true);
      setTitleUuid(item.uuid)
    }

  }

  function closeLessonDetailModal(refreash: boolean) {
    if (refreash) getList();
    setlVisible(false)
    setCourseUuid(null)
  }

  function closeQuestionDetailModal(refreash: boolean) {
    if (refreash) getList();
    setqVisible(false)
    setTitleUuid(null)
    setCurrentCourse({})
  }

  return <Wrapper menus={[]}>
    <QuestionDetail
      visible={qVisible}
      course={currentCourse}
      uuid={titleUuid}
      closeModal={(refreash: boolean) => closeQuestionDetailModal(refreash)} />
    <LessonDetail
      visible={lVisible}
      uuid={courseUuid}
      closeModal={(refreash: boolean) => closeLessonDetailModal(refreash)} />
    <div className={styles['table-wrapper']}>
      <Button size='middle' type="primary" onClick={() => addLesson()}>新增课程</Button>
      <Table rowKey="uuid" childrenColumnName="list" scroll={{ y: 320 }} dataSource={data} columns={columns} />
    </div>
  </Wrapper>
}