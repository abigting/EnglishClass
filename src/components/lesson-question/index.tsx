import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { message } from 'antd';
import ReactPlayer from 'react-player';
import LearningWrapper from '@/components/wrapper/learning';
import Recorder from 'js-audio-recorder';
import useLongPress from "./longPress";

// import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';


// interface DataType {
//     key: React.ReactNode;
//     name: string;
//     address: string;
//     answer: string;
//     children?: DataType[];
// }

const optionsDefault = [{
    key: 'A',
    active: false
}, {
    key: 'B',
    active: false
}, {
    key: 'C',
    active: false
}];

interface IProps {
    course: ICourse;
}

interface ICourse {
    playTimes: string;
    name: string;
    audioPath: string;
    type: number;
}

interface Question {
    uuid: string;
    name: string;
    answer: string;
    problemPath: string;
    interpretationPath: string;
    orderNum: number;
    active?: boolean;
}

const listDefault = [
    {
        uuid: '1',
        name: 'test',
        answer: 'A',
        problemPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        interpretationPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        orderNum: 2,
        active: true
    },
    {
        uuid: '1',
        name: 'test',
        answer: 'A',
        problemPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        interpretationPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        orderNum: 2
    },
    {
        uuid: '1',
        name: 'test',
        answer: 'A',
        problemPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        interpretationPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        orderNum: 2
    }
]

export default function Add(props: IProps) {
    const [recording, setRecording] = useState(false);
    const [options, setOptions] = useState(optionsDefault);
    const [recorder, setRecorder] = useState(new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1, // 声道，支持 1 或 2， 默认是1
        // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    }));

    const [list, setList] = useState<Question[]>(listDefault);

    const longPressHandler = useLongPress(
        () => {
            console.log('点击开始')
            startRecordAudio()
            setRecording(true)
        },
        () => {
            console.log('长按事件')
        },
        () => {
            setRecording(false)
            // message.warning('当前录音时间太短，请继续录音~')
        },
        () => {
            console.log('结束长按事件')
            setRecording(false)
        });

    //开始录音
    function startRecordAudio() {
        Recorder.getPermission().then(
            () => {
                console.log("开始录音");
                recorder.start(); // 开始录音
            },
            (error: { name: any; message: any; }) => {
                console.log(error, 'error')
                message.info("请先允许该网页使用麦克风")
            }
        );
    }

    //选择题 选择答案
    function selectOption(key: string) {
        setOptions(options.map(s => s.key === key ? { ...s, active: true } : { ...s, active: false }))
    }


    const btnBg = {
        default: "https://bhbl.dayuan1997.com/img/default.1df9dcc3.png",
        active: 'https://bhbl.dayuan1997.com/img/active_light.a95ba7f5.png'
    }

    const renderOperation = (type: number) => {
        switch (type) {
            case 1:
                return <div className={styles['lSoundRecording-btn']}>
                    <div className={styles['l-recorder-container']} >
                        <div className={`${styles['btn-recorder']} ${styles['default']}`}
                            style={{ backgroundImage: recording ? `url(${btnBg.active})` : `url(${btnBg.default})` }}
                            {...longPressHandler}>
                            <div className={`${styles['btn-text']} ${recording ? styles['btn-text-active'] : {}}`}>
                                {
                                    recording ? "录音中..." : " 点击按钮回答问题"
                                }
                            </div>
                        </div>
                    </div>
                </div>
            case 2:
                return <div className={styles['l-button-container']}>
                    {
                        options.map(s =>
                            <div key={s.key}
                                className={`${styles['l-btn-default']} ${styles['l-btn-type-1']} ${s.active ? styles['active'] : {}}`} onClick={() => selectOption(s.key)}>
                                <div className={`${styles['btn-text']} ${s.active ? styles['btn-text-active'] : {}}`}>
                                    {s.key}
                                </div>
                            </div>)
                    }
                </div>
        }
    }

    function videoEnd() {
        console.log('videoEnd')
    }

    function videoPause() {
        console.log('videoPause')
    }

    function videoPlay() {
        console.log('videoPlay')
    }

    function videoError() {
        console.log('videoError')
    }

    const currentQuestion = list.find(s => s.active);
    return (
        <div>
            <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
                <div className={styles['video-wrapper']}>
                    {
                        currentQuestion?.problemPath &&
                        <ReactPlayer
                            // url={require("./../../assets/2023_02_26 20_56_17.mp4")}
                            url={currentQuestion?.problemPath}
                            className='react-player'
                            onPlay={() => videoPlay()}
                            onPause={() => videoPause()}
                            onEnded={() => videoEnd()}
                            onError={() => videoError()}
                            // playing
                            controls
                            width='100%'
                            height='100%'
                        />
                    }

                    <span className={styles["l-number"]}>3/13</span>

                    <span className={styles["l-learn-replay"]}>
                        <img className={styles["l-learn-replay-reload"]} src={require("../../assets/imgs/reload.png")} alt="" />
                        <img className={styles["l-learn-replay-close"]} src={require("../../assets/imgs/close.png")} alt="" />
                        <span className={styles["l-learn-replay-num"]} onClick={() => location.reload()}>{props?.course?.playTimes}</span>
                        <img className={styles["l-learn-replay-lb"]} src={require("../../assets/imgs/lb.png")} alt="" />
                        {/* <img className={styles["l-learn-replay-lbing"]} src={require("../../assets/imgs/lb.gif")} alt="" /> */}
                    </span>
                </div>

                {
                    renderOperation(props?.course?.type)
                }
            </LearningWrapper >
        </div>
    );
}