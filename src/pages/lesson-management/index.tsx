import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/wrapper';
import { Table, Button, Popconfirm, message, Form, Input, Row, Col } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined, FolderOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { LearningServices } from '@/services';
import { DataType } from '@/utils/type';
import QuestionDetail from './components/question-detail';
import LessonDetail from './components/lesson-detail';
import styles from './index.less';

const { Search } = Input;

export default function LessonManagement() {
  const [data, setData] = useState([])
  const [paging, setPaging] = useState<any>({})
  const [lVisible, setlVisible] = useState(false)
  const [qVisible, setqVisible] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<any>({})
  const [titleUuid, setTitleUuid] = useState<string | null>()
  const [courseUuid, setCourseUuid] = useState<string | null>()

  const [searchQuery, setSearchQuery] = useState<any>({
    pageSize:2,
    pageNumber:1
  })
  useEffect(() => {
    getList();
  }, [searchQuery])

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
        <a className={styles['form-action']} onClick={() => reviewDeatil(record)}>编辑</a>
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

  async function getList(params?: any) {
    const res = await LearningServices.fetchCourselist(params? {...searchQuery, ...params}:searchQuery);
    if (res.code === 0 && res.data) {
      res.data.forEach((s: { list: string | any[]; }) => {
        if (s.list?.length === 0) {
          delete s.list
        }
      })
      setPaging({
        total: res.count || 0
      })
      setData(res.data)
    }
  }

  function addLesson() {
    setlVisible(true)
  }

  async function dataMerge() {
    const res = await LearningServices.restoreCourse();
    if (res.code === 0) {
      message.success('合并成功')
    }
  }

  async function dataBackup() {
    const res = await LearningServices.backupCourse();
    if (res.code === 0) {
      message.success('备份成功')
    }
  }

  function addQuestion(item: DataType) {
    setCurrentCourse(item)
    setqVisible(true)
  }

  function pagingChange(pagination: TablePaginationConfig){
    setSearchQuery({
      ...searchQuery,
      pageSize:pagination.pageSize,
      pageNumber: pagination.current
    })
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
      <div className={styles['table-operation']}>
        <Row>
          <Col span={8}>
            <Form.Item
              label={"课程名称"}
              name="courseName"
            >
              <Search onSearch={value=>setSearchQuery({...searchQuery, courseName: value})}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button size='middle' type="primary" onClick={() => addLesson()} className={styles['add-btn']}>
              <PlusOutlined />
              新增课程
            </Button>
          </Col>
          <Col span={8}>
            <Button size='middle' onClick={() => dataBackup()} className={styles['backup-btn']}>
              <FolderOutlined />
              课程备份
            </Button>
            <Button size='middle' onClick={() => dataMerge()} className={styles['merge-btn']}>
              <VerticalAlignMiddleOutlined />
              课程合并
            </Button>
          </Col>
        </Row>
      </div>
      <Table rowKey="uuid"
        childrenColumnName="list"
        scroll={{ y: 320 }}
        dataSource={data}
        columns={columns}
        pagination={{
          size: 'small',
          pageSize: 2,
          total: paging?.total
        }}
        onChange={(pagination)=>pagingChange(pagination)}
         />
    </div>
  </Wrapper>
}