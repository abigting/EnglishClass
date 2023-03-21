import { Link, Outlet } from 'umi';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import ReactPlayer from 'react-player';
import LearningWrapper from '@/components/wrapper/learning';
import Recorder from 'js-audio-recorder';
import { LearningServices } from '@/services'
import { ReactMediaRecorder } from '@/components/reactMediaRecorder';
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
    list: any
}

interface Question {
    uuid: string;
    courseUuid: string;
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
        problemPath: "/static/2023_02_26 20_47_31.ba978906.mp4",
        interpretationPath: "/static/2023_02_26 20_47_31.ba978906.mp4",
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
    const [disable, setDisable] = useState(false);
    const [options, setOptions] = useState(optionsDefault);
    const [playTimes, setPlayTimes] = useState(props?.course?.playTimes);

    const [audioUrl, setAudio] = useState();

    const [recorder, setRecorder] = useState(new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1, // 声道，支持 1 或 2， 默认是1
        // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    }));

    // const [list, setList] = useState<Question[]>(listDefault);
    const [list, setList] = useState<Question[]>([]);

    useEffect(()=>{
        console.log(props?.course?.list, 'Fiona')
        if(props?.course?.list && props?.course?.list.length>0){
            setList(props?.course?.list)
        }

    },[props?.course?.list])

    function recordFn() {
        if (disable) {
            message.info("请先听题");
            return
        }
        if (recording) {
            setRecording(false)
            // 暂停录音
            recorder.stop()
            // 获取录音结果
            const blob = recorder.getWAVBlob() // blob格式

            setAudio(blob)
            const file = new File([blob], "testname", { type: "audio/mp3", lastModified: Date.now() });
            answerQuestions('3', file)
            // 关闭并销毁录音实例
            recorder.destroy()
        } else {
            startRecordAudio()
        }

    }

    //开始录音
    function startRecordAudio() {
        console.log('test')
        Recorder.getPermission().then(
            () => {
                console.log("开始录音");
                setRecording(true)
                recorder.start(); // 开始录音
            },
            (error: { name: any; message: any; }) => {
                console.log(error, 'error')
                message.info("请先允许该网页使用麦克风")
            }
        );
    }

    //选择题 选择答案 1|2
    function selectOption(key: string) {
        setOptions(options.map(s => s.key === key ? { ...s, active: true } : { ...s, active: false }));
        const activeIndex = list.findIndex(s => s.active);
        setTimeout(async () => {
            await answerQuestions('1', key);
            setList(list.map((s, i) => i === activeIndex + 1 ? { ...s, active: true } : { ...s, active: false }));
            setOptions(options.map(s => { return { ...s, active: false } }));
            setDisable(true);
        }, 1000)

        console.log(activeIndex, 'activeIndex')
        // setRecording()
    }

    //答题
    async function answerQuestions(type: string, answer: any) {
        const currentItem = list.find(s => s.active) || list[0];
        if(!currentItem) return
        let formData = new FormData();
        formData.append("courseUid", currentItem.courseUuid);
        formData.append("titleUuid", currentItem.uuid);
        formData.append("score", "1");
        if (type === '1' || type === '2') {
            formData.append("userAnswer", answer);
        } else {
            formData.append("userAnswerPath", answer);
        }
        const res = await LearningServices.answerQuestions(formData);
        if (res === 0) {

        }
    }

    const renderOperation = (type: string) => {
        switch (type) {
            case '3':
                return <div className={styles['lSoundRecording-btn']}>
                    <div className={styles['l-recorder-container']} >
                        <div className={`
                        ${styles['btn-recorder']} 
                        ${disable ? styles['btn-recorder-disabled'] : recording ? styles['btn-recorder-recording'] : styles['btn-recorder-default']}`}
                            onClick={() => recordFn()}
                        // {...longPressHandler}
                        >
                            <div className={`${styles['btn-text']}`}>
                                {
                                    recording ? "录音中..." : " 点击按钮回答问题"
                                }
                            </div>
                            {
                                recording && <>
                                    <div className={styles['process-bar-container']} ><div className={styles['process-bar']} style={{ width: "70%" }}></div></div>
                                    <img className={styles['process-bar-record']} src={require("../../assets/imgs/record.png")} alt="" />
                                </>
                            }
                        </div>
                    </div>
                </div>
            case '1':
            case '2':
                return <div className={styles['l-button-container']}>
                    {
                        options.map(s =>
                            <div key={s.key}
                                className={`
                                ${styles['l-btn-default']} 
                                ${styles['l-btn-type-1']} 
                                ${s.active ? styles['active'] : {}}
                                ${disable ? styles['disabled'] : {}}
                                `} onClick={() => selectOption(s.key)}>
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
        setDisable(false)
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

    const currentQuestion = list.find(s => s.active) || list[0];
    const activeIndex = list.findIndex(s => s.active) || 0;
    return (
        <div>
            <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
                {/* <audio src={audioUrl}></audio> */}
                <div className={styles['video-wrapper']}>
                    {
                        currentQuestion?.problemPath &&
                        <ReactPlayer
                            // url={require("./../../assets/2023_02_26 20_47_31.mp4")}
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

                    <span className={styles["l-number"]}>{activeIndex + 1}/13</span>

                    <span className={styles["l-learn-replay"]}>
                        <img className={styles["l-learn-replay-reload"]} src={require("../../assets/imgs/reload.png")} alt="" />
                        <img className={styles["l-learn-replay-close"]} src={require("../../assets/imgs/close.png")} alt="" />
                        <span className={styles["l-learn-replay-num"]} onClick={() => location.reload()}>{playTimes}</span>
                        <img className={styles["l-learn-replay-lb"]} src={require("../../assets/imgs/lb.png")} alt="" />
                        {/* <img className={styles["l-learn-replay-lbing"]} src={require("../../assets/imgs/lb.gif")} alt="" /> */}
                    </span>
                </div>

                {
                    // renderOperation(props?.course?.type)
                    renderOperation('3')
                }
            </LearningWrapper >
        </div>
    );
}