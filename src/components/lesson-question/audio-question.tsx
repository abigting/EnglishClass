import { useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import ReactPlayer from 'react-player';
import LearningWrapper from '@/components/wrapper/learning';
import Recorder from 'js-audio-recorder';
import { LearningServices } from '@/services';
import Badge from '@/components/badge';
import { ICourse, ITitle } from '@/utils/type';
import styles from './index.less';

interface IProps {
    course: ICourse;
}

interface IVideoObj {
    url?: string
    interpretation?: boolean;
}

let timer: any; // 1 计时器

export default function Add(props: IProps) {
    const [recording, setRecording] = useState(false);
    const [disable, setDisable] = useState(true);
    const [playTimes, setPlayTimes] = useState(props?.course?.playTimes);

    const [BVisible, setBVisible] = useState<boolean>(false)

    const [videoObj, setVideoObj] = useState<IVideoObj>({});
    const [list, setList] = useState<ITitle[]>([]);
    const [recorder, setRecorder] = useState(new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1, // 声道，支持 1 或 2， 默认是1
        // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    }));

    const [progress, setProgress] = useState<number>(0);
    const rightAudio = useRef<HTMLAudioElement>(null)
    const wrongAudio = useRef<HTMLAudioElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    // const [audioUrl, setAudio] = useState<any>();
    // const [videoObj, setVideoObj] = useState({
    //     url: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
    //     interpretation: false
    // });
    // const [list, setList] = useState<ITitle[]>(listDefault);


    useEffect(() => {
        const list = props?.course?.list;
        if (list && list?.length > 0) {
            setVideoObj({
                url: list[0].problemPath,
                interpretation: false
            })
            setList(list)
        }
    }, [props?.course?.list])

    useEffect(() => {
        return () => {
            clearInterval(timer)
        }
    }, [])


    //文档： https://blog.csdn.net/qq_34241004/article/details/108347473
    function recordFn() {
        if (disable) {
            message.info("请先听题");
            return
        }
        if (recording) {
            stopRecordAudio()
        } else {
            startRecordAudio()
        }
    }

    function stopRecordAudio(){
        setRecording(false)
        // 暂停录音
        clearInterval(timer)
        recorder.stop()
        // 获取录音结果
        const formData = new FormData()
        const blob = recorder.getWAVBlob()// 获取wav格式音频数据
        // 此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为file塞入formData
        const newbolb = new Blob([blob], { type: 'audio/mp3' })
        const fileOfBlob = new File([newbolb], new Date().getTime() + '.mp3')
        formData.append('file', fileOfBlob)
        // const url = window.URL.createObjectURL(fileOfBlob) //本地播放
        // setAudio(url)

        answerQuestions(fileOfBlob).then((res: any) => {
            if (res.code === 0) {
                // ---- 答题之后的逻辑
                const current = list.find(s => s.active) || list[0];

                if (res?.data?.score>5) {
                    rightAudio.current?.play()
                } else {
                    wrongAudio.current?.play()
                }

                // setAutoPlay(true)
                // 有解答 - 放解答
                if (current.interpretationPath) {
                    setVideoObj({
                        url: current.interpretationPath,
                        interpretation: true
                    })

                    setTimeout(() => {
                        onPlay()
                    }, 3000)

                    //无解答 - 放下一题
                } else {
                    const currentIndex = list.findIndex(s => s.active) === -1 ? 0 : list.findIndex(s => s.active);
                    const nextItem = list.find((_s, i) => i === currentIndex + 1);
                    if (nextItem) {
                        setList(list.map((s, i) => i === currentIndex + 1 ? { ...s, active: true } : { ...s, active: false }));
                        setVideoObj({
                            url: nextItem.problemPath,
                            interpretation: false
                        })
                        setTimeout(() => {
                            onPlay()
                        }, 3000)
                    }
                }

            } else {

            }
        });
        // 关闭并销毁录音实例
        recorder.destroy()
    }

    
    function onPlay(){
        videoRef?.current?.getInternalPlayer().play();
    }

    function onPause(){
        videoRef?.current?.getInternalPlayer().pause();
    }

    //开始录音
    function startRecordAudio() {
        Recorder.getPermission().then(
            () => {
                console.log("开始录音");
                setRecording(true);
                setTimer(); // 进度条
                recorder.start(); // 开始录音
            },
            (error: { name: any; message: any; }) => {
                console.log(error, 'error')
                message.info("请先允许该网页使用麦克风")
            }
        );
    }

    //答题
    async function answerQuestions(answer: any) {
        const currentItem = list.find(s => s.active) || list[0];
        if (!currentItem) return
        let formData = new FormData();
        // formData.append("userUUId", Cookies.get("userUUId"));
        formData.append("courseUuid", currentItem.courseUuid);
        formData.append("titleUuid", currentItem.uuid);
        formData.append("userAnswerPath", answer);
        const res = await LearningServices.answerQuestions(formData);
        return res
    }

    function videoEnd() {
        if (videoObj.interpretation) {
            playNext()
        } else {
            setDisable(false);
        }
    }

    function playNext() {
        const currentIndex = list.findIndex(s => s.active) === -1 ? 0 : list.findIndex(s => s.active);
        const nextItem = list.find((_s, i) => i === currentIndex + 1);
        if (nextItem) {
            setList(list.map((s, i) => i === currentIndex + 1 ? { ...s, active: true } : { ...s, active: false }));
            setVideoObj({
                url: nextItem.problemPath,
                interpretation: false
            });
            setTimeout(()=>onPlay(), 1000)
        } else {
            setBVisible(true)
        }
    }

    function videoPause() {
        console.log('videoPause')
    }

    function videoPlay() {
        setDisable(true)
    }

    function videoError() {
        message.error('视频异常，请检查视频地址')
    }

    const setTimer = () => {
        timer = setInterval(() => {
            setProgress(n => {
                if (n + 3 <= 100) {
                    return n + 3
                } else {
                    clearInterval(timer);
                    stopRecordAudio();
                    return 100
                }
            });
        }, 1000)
    }

    const activeIndex = list.findIndex(s => s.active) === -1 ? 0 : list.findIndex(s => s.active);

    return (
        <div>
            <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
                <audio ref={rightAudio} style={{ display: 'none' }} src={require('@/assets/audios/correct.mp3')}></audio>
                <audio ref={wrongAudio} style={{ display: 'none' }} src={require('@/assets/audios/wrong.mp3')}></audio>
                <Badge visible={BVisible} courseUuid={props.course?.uuid} closeBadge={() => setBVisible(false)} />
                <div className={styles['video-wrapper']}>
                    {
                        videoObj?.url &&
                        <ReactPlayer
                            // url={require("./../../assets/2023_02_26 20_47_31.mp4")}
                            ref={videoRef}
                            url={videoObj?.url}
                            className='react-player'
                            onPlay={() => videoPlay()}
                            onPause={() => videoPause()}
                            onEnded={() => videoEnd()}
                            onError={() => videoError()}
                            playing={false}
                            controls
                            width='100%'
                            height='100%'
                        />
                    }
                    {
                        props?.course?.showCount ? <span className={styles["l-number"]}>{activeIndex + 1}/{list?.length}</span> : null
                    }
                    <span className={styles["l-learn-replay"]}>
                        <img className={styles["l-learn-replay-reload"]} src={require("../../assets/imgs/reload.png")} alt="" />
                        <img className={styles["l-learn-replay-close"]} src={require("../../assets/imgs/close.png")} alt="" />
                        <span className={styles["l-learn-replay-num"]} onClick={() => location.reload()}>{playTimes}</span>
                        {/* {
                            disable ?
                                <img className={styles["l-learn-replay-lbing"]} src={require("../../assets/imgs/lb.gif")} alt="" /> :
                                <img className={styles["l-learn-replay-lb"]} src={require("../../assets/imgs/lb.png")} alt="" />
                        } */}
                    </span>
                </div>
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
                                    recording ? "录音中..." : " 点击按钮回答问题"
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
                </div>
            </LearningWrapper >
        </div>
    );
}