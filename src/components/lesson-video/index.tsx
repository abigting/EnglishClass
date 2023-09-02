import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { message } from 'antd';
import LearningWrapper from '@/components/wrapper/learning';
import { LearningServices } from '@/services';
import { ICourse } from '@/utils/type';
import styles from './index.less';

interface IProps {
    course: ICourse;
    playControl: any
}

export default function LessonVideo(props: IProps) {
    const [playTimes, setPlayTimes] = useState(0);

    useEffect(() => {
        setPlayTimes(props?.playControl?.videoNumYu)
    }, [props.playControl])

    function videoPlay() {
        // if (playTimes > 0) {
        //     setPlayTimes(playTimes - 1)
        // }
    }

    async function videoEnd() {
        if (playTimes > 0) {
            const current = playTimes - 1;
            setPlayTimes(current);
            LearningServices.editPlayControl({
                courseUuid: props.course.uuid,
                videoNumYu: current,
                audioNumYu: props?.playControl?.audioNumYu
            })
        }
    }

    return (
        <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
            <div className={styles['video-wrapper']}>
                <ReactPlayer
                    // url={require("./../../assets/2023_02_26 20_56_17.mp4")}
                    url={props?.course?.videoPath}
                    className={styles['react-player']}
                    playing
                    onPlay={() => videoPlay()}
                    // onPause={() => videoEnd()}
                    onEnded={() => videoEnd()}
                    controls={true}
                    width='100%'
                    height='100%'
                />
                {
                    window.localStorage.getItem("EnglishClass_isAdmin") === 'true' ? null : <div className="video-progress" />
                }
                <span className={styles['left-times']}>播放{playTimes}次 可解锁下一关</span>
            </div>
        </LearningWrapper >
    );
}
