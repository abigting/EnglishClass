import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload, Table } from 'antd';
import ReactPlayer from 'react-player';
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
        <LearningWrapper title="video" className={styles['learn-vidreact-playereo']}>
        <div className={styles['video-wrapper']}>
            <ReactPlayer
                url={require("./../../assets/2023_02_26 20_56_17.mp4")}
                className='react-player'
                // playing
                controls
                width='100%'
                height='100%'
            />
        </div>
    </LearningWrapper >
    );
}
