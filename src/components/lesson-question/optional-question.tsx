import { useEffect, useState } from 'react';
import { message } from 'antd';
import ReactPlayer from 'react-player';
import LearningWrapper from '@/components/wrapper/learning';
import { LearningServices } from '@/services'
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
    videoPath: string;
    type: number;
    list: any;
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

interface IVideoObj{
    url?: string
    interpretation?: boolean;
}

interface IOptions{
    key: string,
    active?: boolean | null,
    status?: string | null
}

const listDefault = [
    {
        "id": 5,
        "courseUuid": "81bcb0ca0a3e4b4ebd312905cb84c547",
        "uuid": "c7581da8e538483cb7a980a8b5909b81",
        "name": "题目一",
        "answer": "B",
        problemPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        interpretationPath: "/static/2023_02_26 20_47_31.ba978906.mp4",
        "orderNum": 1
    },
    {
        "id": 6,
        "courseUuid": "81bcb0ca0a3e4b4ebd312905cb84c547",
        "uuid": "1f6a7faed0db465db8e091f9c6cc3bf7",
        "name": "题目二",
        "answer": "B",
        problemPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        "interpretationPath": null,
        "orderNum": 2
    },
    {
        "id": 7,
        "courseUuid": "81bcb0ca0a3e4b4ebd312905cb84c547",
        "uuid": "ef52b71afc134e58923e6dfa60ed8230",
        "name": "题目三",
        "answer": "C",
        problemPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        interpretationPath: "/static/2023_02_26 20_56_17.ba7c481e.mp4",
        "orderNum": 3
    },
    {
        "id": 8,
        "courseUuid": "81bcb0ca0a3e4b4ebd312905cb84c547",
        "uuid": "876157e4174c47cfa61358f2b9225e07",
        "name": "题目四",
        "answer": "C",
        problemPath: "/static/2023_02_26 20_47_31.ba978906.mp4",
        "interpretationPath": null,
        "orderNum": 4
    }
]

export default function Add(props: IProps) {
    const [disable, setDisable] = useState(true);
    const [options, setOptions] = useState<IOptions[]>(optionsDefault);
    const [autoPlay, setAutoPlay] = useState(false);
    const [playTimes, setPlayTimes] = useState(props?.course?.playTimes);

    const [videoObj, setVideoObj] = useState<IVideoObj>({});

    // const [list, setList] = useState<Question[]>(listDefault);
    const [list, setList] = useState<Question[]>([]);

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

    //选择题 选择答案 1|2
    function selectOption(key: string) {
        setOptions(options.map(s => s.key === key ? { ...s, active: true, status:null } : { ...s, active: false, status:null }));

        answerQuestions(key).then((res: any) => {
            if (res.code === 0) {
                // ---- 答题之后的逻辑
                const current = list.find(s => s.active) || list[0];

                setAutoPlay(true)
                // 有解答 - 放解答
                if (current.interpretationPath) {
                    const { correctAnswer, userAnswer } = res.data;
                    setOptions(options.map(s => s.key === userAnswer ?
                        { ...s, status: userAnswer === correctAnswer ? 'correct' : 'error', active: false } :
                        { ...s, active: false, status: null }));
                    setVideoObj({
                        url: current.interpretationPath,
                        interpretation: true
                    })
                    //无解答 - 放下一题
                } else {
                    setOptions(options.map(s => { return { ...s, active: false, status:null } }));
                    const currentIndex = list.findIndex(s => s.active) === -1 ? 0 : list.findIndex(s => s.active);
                    const nextItem = list.find((_s, i) => i === currentIndex + 1);
                    if (nextItem) {
                        setList(list.map((s, i) => i === currentIndex + 1 ? { ...s, active: true } : { ...s, active: false }));
                        setVideoObj({
                            url: nextItem.problemPath,
                            interpretation: false
                        })
                    }
                }

            }
        });

    }

    //答题
    async function answerQuestions(answer: any) {
        const currentItem = list.find(s => s.active) || list[0];
        if (!currentItem) return
        let formData = new FormData();
        // formData.append("userUUId", Cookies.get("userUUId"));
        formData.append("courseUuid", currentItem.courseUuid);
        formData.append("titleUuid", currentItem.uuid);
        formData.append("userAnswer", answer);
        return await LearningServices.answerQuestions(formData);
    }

    function videoEnd() {
        if (videoObj.interpretation) {
            playNext();
            setOptions(options.map(s => { return { ...s, status:null } }));
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
            })
        }else{
            message.success('恭喜你，已答题完成')
        }
    }

    function videoPause() {
        console.log('videoPause')
    }

    function videoPlay() {
        setDisable(true)
    }

    function videoError() {
        console.log('videoError')
    }

    const currentQuestion = list.find(s => s.active) || list[0];
    const activeIndex = list.findIndex(s => s.active) === -1 ? 0 : list.findIndex(s => s.active);

    return (
        <div>
            <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
                {/* <audio src={audioUrl}></audio> */}
                <div className={styles['video-wrapper']}>
                    {
                        currentQuestion?.problemPath &&
                        <ReactPlayer
                            // url={require("./../../assets/2023_02_26 20_47_31.mp4")}
                            // url={currentQuestion?.problemPath}
                            url={videoObj?.url}
                            className='react-player'
                            onPlay={() => videoPlay()}
                            onPause={() => videoPause()}
                            onEnded={() => videoEnd()}
                            onError={() => videoError()}
                            playing={autoPlay}
                            controls
                            width='100%'
                            height='100%'
                        />
                    }

                    <span className={styles["l-number"]}>{activeIndex + 1}/{list?.length}</span>

                    <span className={styles["l-learn-replay"]}>
                        <img className={styles["l-learn-replay-reload"]} src={require("../../assets/imgs/reload.png")} alt="" />
                        <img className={styles["l-learn-replay-close"]} src={require("../../assets/imgs/close.png")} alt="" />
                        <span className={styles["l-learn-replay-num"]} onClick={() => location.reload()}>{playTimes}</span>
                        <img className={styles["l-learn-replay-lb"]} src={require("../../assets/imgs/lb.png")} alt="" />
                        {/* <img className={styles["l-learn-replay-lbing"]} src={require("../../assets/imgs/lb.gif")} alt="" /> */}
                    </span>
                </div>

                <div className={styles['l-button-container']}>
                    {
                        options.map(s =>
                            <div key={s.key}
                                className={`
                                ${styles['l-btn-default']} 
                                ${styles['l-btn-type-1']} 
                                ${s.active ? styles['active'] : {}}
                                ${disable ? styles['disabled'] : {}}
                                ${s.status === "correct" ? styles['correct'] : s.status === "error" ? styles['error'] : {}}
                                `} onClick={() => selectOption(s.key)}>
                                <div className={`${styles['btn-text']} ${s.active ? styles['btn-text-active'] : {}}`}>
                                    {s.key}
                                </div>
                            </div>)
                    }
                </div>
            </LearningWrapper >
        </div>
    );
}