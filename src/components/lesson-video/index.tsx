import  { useState } from 'react';
import ReactPlayer from 'react-player';
import { message } from 'antd';
import LearningWrapper from '@/components/wrapper/learning';
import { LearningServices } from '@/services';
import { ICourse } from '@/utils/type';
import styles from './index.less';


interface IProps {
    course: ICourse;
}

export default function Add(props: IProps) {
    const [playTimes, setPlayTimes] = useState(3);

    function videoPlay() {
        if (playTimes > 0) {
            setPlayTimes(playTimes - 1)
        }
    }

    function videoPause() {
        if (playTimes <= 0) {
            message.info("你已经无可暂停次数~")
            return false;
        }
    }

   async function videoEnd(){
    LearningServices.playControl({ uuid: props.course.uuid, status: 1 })
    }

    return (
        <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
            <div className={styles['video-wrapper']}>
                <ReactPlayer
                    // url={require("./../../assets/2023_02_26 20_56_17.mp4")}
                    url={props?.course?.videoPath}
                    className='react-player'
                    // playing
                    onPlay={() => videoPlay()}
                    onPause={() => videoEnd()}
                    onEnded={()=>videoEnd()}
                    controls={true}
                    width='100%'
                    height='100%'
                />
                <span className={styles['left-times']}>剩余暂停次数：{playTimes}</span>
            </div>
        </LearningWrapper >
    );
}
