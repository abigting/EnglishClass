import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload, Table } from 'antd';
import { Player } from 'video-react';
import LearningWrapper from '@/components/wrapper/learning';
// import { PlusOutlined } from '@ant-design/icons';
import 'video-react/dist/video-react.css';
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
        <LearningWrapper title="video" className={styles['learn-video']}>
            <Player>
                <source src={require("D:\\download\\browser\\2023_03_12 19_43_21.mp4")} />
                {/* <source src={require("D:/download/browser/2023_03_12 19_43_21.mp4")} /> */}
            </Player>
        </LearningWrapper >
    );
}
