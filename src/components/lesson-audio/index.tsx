import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload, Table } from 'antd';
import LearningWrapper from '@/components/wrapper/learning';
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

    return (
        <LearningWrapper title="test" className={styles['learn-audio']}>
            <img src="https://bhbl.dayuan1997.com/img/record.e551874a.png" alt=""
                    className={styles['learn-audio-record']} />
                <img src="https://bhbl.dayuan1997.com/img/handle.8d346771.png" alt=""
                    className={styles['learn-audio-handle']} />
                <div
                    className={styles['learn-audio-play']}>
                    <div
                        className={styles['learn-audio-bottom']}>
                        <div className={styles['progress']}>
                            <div className={styles['progress-section']}>
                                <div id="l-progress-audio" draggable="false" className={styles['progress-box']}>
                                    <div className={styles['progress-small']} style={{ width: 0 }}>
                                        <span className={styles['circle']}></span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['time']}>
                                <label className={`${styles['time-show']} ${styles['current-time']}`}>00:00:00</label>
                                <label className={styles['time-show']}>00:21:24</label>
                            </div>
                        </div>
                        <div className={styles['audio-contrl']}>
                            <span className={styles['play']}></span>
                        </div>
                        <span className={styles['pause-number']}>剩余暂停次数：3次</span>
                    </div>
                </div>
        </LearningWrapper >
    );
}
