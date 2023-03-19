import React, { useState, useRef, useEffect } from 'react';
import LearningWrapper from '@/components/wrapper/learning';
import styles from './index.less';

interface DataType {
    key: React.ReactNode;
    name: string;
    address: string;
    answer: string;
    children?: DataType[];
}

export default function Add() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [play, setPlay] = useState(false);
    const [playTimes, setPlayTimes] = useState(3);
    const [process, setProcess] = useState("0%");
    const [currentTime, setCurrentTime] = useState("00:00:00");

    useEffect(() => {
        processTimer;
        timeShowTimer;
        return ()=>{
            clearInterval(processTimer);
            clearInterval(timeShowTimer);
        }
    }, [])

    const processTimer =  setInterval(() => {
        updateProcess();
    }, 120000)

    const timeShowTimer = setInterval(() => {
        updateTimeShow()
    }, 1000)

    function togglePlay() {
        if (playTimes === 0) return
        if (!play) {
            setPlayTimes(playTimes - 1);
            audioRef.current?.play();
        } else {
            audioRef.current?.pause()
        }
        setPlay(!play)
        // updateTimeShow()
    }

    //进度条主函数
    function updateProcess() {
        if (audioRef.current) {
            const Process_now = audioRef.current?.currentTime / audioRef.current?.duration * 100;
            setProcess(`${Process_now}%`)
        }
    }

    function updateTimeShow() {
        if (audioRef.current?.currentTime) {
            const time = timeFormat(audioRef.current?.currentTime);
            setCurrentTime(time);
        }
    }

    //将单位为秒的的时间转换成mm:ss的形式
    function timeFormat(number: number | undefined) {
        if (!number) return "00:00:00";
        const minute = Math.floor(number / 60);
        const second = Math.floor(number % 60);
        const minuteStr = minute >= 10 ? minute : "0" + minute;
        const secondStr = second >= 10 ? second : "0" + second;
        return "00:" + minuteStr + ":" + secondStr;
    }

    return (
        <LearningWrapper title="test" className={styles['learn-audio']}>
            <img src="https://bhbl.dayuan1997.com/img/record.e551874a.png" alt=""
                className={`${styles['learn-audio-record']} ${play ? styles['rotate'] : {}}`} />
            <img src="https://bhbl.dayuan1997.com/img/handle.8d346771.png" alt=""
                className={`${styles['learn-audio-handle']} ${play ? styles['handle-play'] : {}}`} />
            <div
                className={styles['learn-audio-play']}>
                <div
                    className={styles['learn-audio-bottom']}>
                    <div className={styles['progress']}>
                        <div className={styles['progress-section']}>
                            <div id="l-progress-audio" draggable="false" className={styles['progress-box']}>
                                <div className={styles['progress-small']} style={{ width: process }}>
                                    <span className={styles['circle']}></span>
                                </div>
                            </div>
                        </div>
                        <div className={styles['time']}>
                            <label className={`${styles['time-show']} ${styles['current-time']}`}>{currentTime}</label>
                            <label className={styles['time-show']}>{timeFormat(audioRef.current?.duration)}</label>
                        </div>
                    </div>
                    <div className={styles['audio-contrl']} onClick={() => togglePlay()}>
                        {
                            play ? <span className={styles['pause']}></span> : <span className={styles['play']}></span>
                        }
                    </div>
                    <span className={styles['pause-number']}>剩余暂停次数：{playTimes}次</span>
                </div>
            </div>
            <audio ref={audioRef} src="https://bhbl-prod.oss-accelerate.aliyuncs.com/undefined/2022/03/05/New%20Groove%2813%29.mp3?Expires=1679212180&OSSAccessKeyId=LTAI5tA6cc2K5H6xzdeuvpmt&Signature=aY7i9mswj7ah%2BCVESTZp5Zvv3Cc%3D"></audio>
        </LearningWrapper >
    );
}
