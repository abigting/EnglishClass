import { useState, useRef } from 'react';
import { message } from 'antd';
import ReactPlayer from 'react-player';
import LearningWrapper from '@/components/wrapper/learning';
import Recorder from 'js-audio-recorder';
import { LearningServices } from '@/services';
import FinishInfo from './finish-info';
import { ICourse } from '@/utils/type';
import styles from './index.less';

interface IProps {
    course: ICourse;
    muted?: boolean;
}

interface IVideoObj {
    url?: string
    interpretation?: boolean;
}

let timer: any; // 1 计时器

export default function Add(props: IProps) {
    const [recording, setRecording] = useState(false);
    const [disable, setDisable] = useState(false);
    const [visible, setVisible] = useState<boolean>(false)
    const recorder = useRef(new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1, // 声道，支持 1 或 2， 默认是1
        // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    }));

    const [progress, setProgress] = useState<number>(0);
    const rightAudio = useRef<HTMLAudioElement>(null)
    const wrongAudio = useRef<HTMLAudioElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)


    function videoPlay() {
        // videoFullScreen()
    }

    function videoFullScreen() {
        const video = videoRef?.current?.getInternalPlayer();
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullscreen) {
            video.mozRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

    function videoPause() {

    }

    function videoEnd() {
        stopRecordAudio()
    }

    function recordFn() {
        if (recording) {
            // stopRecordAudio()
        } else {
            startRecordAudio()
        }
    }

    //开始录音
    function startRecordAudio() {
        Recorder.getPermission().then(
            () => {
                console.log("开始录音");
                setRecording(true);
                // setTimer(); // 进度条
                recorder.current.start(); // 开始录音
                videoRef?.current?.getInternalPlayer().play();
            },
            (error: { name: any; message: any; }) => {
                console.log(error, 'error')
                message.info("请先允许该网页使用麦克风")
            }
        );
    }

    //停止录音
    function stopRecordAudio() {
        setRecording(false)
        // 暂停录音
        clearInterval(timer)
        recorder.current.stop()
        // 获取录音结果
        const formData = new FormData()
        const blob = recorder.current.getWAVBlob()// 获取wav格式音频数据
        // 此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为file塞入formData
        const newbolb = new Blob([blob], { type: 'audio/mp3' })
        const fileOfBlob = new File([newbolb], new Date().getTime() + '.mp3')
        formData.append('file', fileOfBlob)
        // const url = window.URL.createObjectURL(fileOfBlob) //本地播放
        // setAudio(url)
        answerQuestions(fileOfBlob).then((res: any) => {
            if (res.code === 0) {
                setVisible(true)
            }
        });

        // 关闭并销毁录音实例
        recorder.current.destroy()
    }

    //保存录音
    async function answerQuestions(answer: any) {
        const { course } = props;
        let formData = new FormData();
        formData.append("courseUuid", course.uuid);
        formData.append("userFollowReadPath", answer);
        const res = await LearningServices.answerReadingUpload(formData);
        return res
    }

    function updateProcess(info: any) {
        const { loadedSeconds, playedSeconds } = info;
        const pro = (playedSeconds / loadedSeconds) * 100
        setProgress(pro)
    }

    return (
        <div>
            <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
                <audio ref={rightAudio} style={{ display: 'none' }} src={require('@/assets/audios/correct.mp3')}></audio>
                <audio ref={wrongAudio} style={{ display: 'none' }} src={require('@/assets/audios/wrong.mp3')}></audio>
                <FinishInfo visible={visible} uuid={props?.course?.uuid} />
                <div className={styles['video-wrapper']}>
                    <ReactPlayer
                        controls={props.muted ? false : true}
                        muted={props.muted}
                        id="picts"
                        // url={require("@/assets/2023_02_26 20_47_31.mp4")}
                        ref={videoRef}
                        url={props?.course?.followPath}
                        className={styles['react-player']}
                        onPlay={() => videoPlay()}
                        onPause={() => videoPause()}
                        onEnded={() => videoEnd()}
                        onProgress={(info) => updateProcess(info)}
                        playing={false}
                        width='100%'
                        height='100%'
                    />
                </div>
                {
                    props.muted ?
                        <div className={styles['lSoundRecording-btn']}>
                            <div className={styles['l-recorder-container']} >
                                <div className={`
                        ${styles['btn-recorder']} 
                        ${disable ? styles['btn-recorder-disabled'] : recording ? styles['btn-recorder-recording'] : styles['btn-recorder-default']}
                        `}
                                    onClick={() => recordFn()}
                                >
                                    <div className={`${styles['btn-text']}`}>
                                        {
                                            recording ? "录音中..." : " 点击按钮开始朗读"
                                        }
                                    </div>
                                    {
                                        recording && <>
                                            <div className={styles['process-bar-container']} ><div className={styles['process-bar']} style={{ width: `${progress}%` }}></div></div>
                                            <img className={styles['process-bar-record']} src={require("@/assets/imgs/record.png")} alt="" />
                                        </>
                                    }
                                </div>
                            </div>
                        </div> : null
                }
            </LearningWrapper >
        </div>
    );
}