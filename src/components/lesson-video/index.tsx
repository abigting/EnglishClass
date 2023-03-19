import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { message } from 'antd';
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
    const [playTimes, setPlayTimes] = useState(3);

    function videoPlay(){
        if(playTimes>0){
            setPlayTimes(playTimes-1)
        }
    }

    function videoPause(){
       if(playTimes <=0){
        message.info("你已经无可暂停次数~")
        return false;
       }
    }

    return (
        <LearningWrapper title="video" className={styles['learn-vidreact-playereo']}>
        <div className={styles['video-wrapper']}>
            <ReactPlayer
                url={require("./../../assets/2023_02_26 20_56_17.mp4")}
                className='react-player'
                // playing
                onPlay={()=>videoPlay()}
                onPause={()=>videoPause()}
                controls = {true}
                width='100%'
                height='100%'
                
            />
            <span className={styles['left-times']}>剩余暂停次数：{playTimes}</span>
        </div>
    </LearningWrapper >
    );
}
