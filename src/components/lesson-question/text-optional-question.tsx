import { useEffect, useState, useRef } from 'react';
import { Modal } from 'antd';
import LearningWrapper from '@/components/wrapper/learning';
import { LearningServices } from '@/services';
import Badge from '@/components/badge';
import { ICourse, ITitle, IOption, IVideoObj } from '@/utils/type';
import { ANSWER_OPTIONS } from '@/utils/config';
import Dtcard from '../dtcard';
import styles from './index.less';

const optionsDefault = ANSWER_OPTIONS[3].map((s: string)=>{return {key: s}});

interface IProps {
    course: ICourse;
}

export default function TextOptionalQuestion(props: IProps) {
    const [options, setOptions] = useState<IOption[]>(optionsDefault);
    const [videoObj, setVideoObj] = useState<IVideoObj>({});
    const [list, setList] = useState<ITitle[]>([]);
    const [BVisible, setBVisible] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false);
    const rightAudio = useRef<HTMLAudioElement>(null)
    const wrongAudio = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const answerNum = props?.course?.answerNum;
        if(answerNum){
            let answerOptions = optionsDefault;
            switch (answerNum) {
                case 2:
                case 3:
                case 4:
                    answerOptions = ANSWER_OPTIONS[answerNum].map((s: string)=>{return {key: s}});
                default:
                    break;
            }
            setOptions(answerOptions)
        }
    }, [])

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

    //选择题 选择答案 1
    function selectOption(key: string) {
        setOptions(options.map(s => s.key === key ? { ...s, active: true, status: null } : { ...s, active: false, status: null }));
        answerQuestions(key).then((res: any) => {
            if (res.code === 0) {
                // ---- 答题之后的逻辑
                const { correctAnswer, userAnswer } = res.data;
                if (userAnswer === correctAnswer) {
                    rightAudio.current?.play()
                } else {
                    wrongAudio.current?.play()
                }
                setOptions(options.map(s => s.key === userAnswer ?
                    { ...s, status: userAnswer === correctAnswer ? 'correct' : 'error', active: false } :
                    { ...s, active: false, status: null }));
                setTimeout(() => {
                    nextQuestion();
                }, 3000)
            }
        });

    }

    function nextQuestion() {
        setOptions(options.map(s => { return { ...s, active: false, status: null } }));
        const currentIndex = list.findIndex(s => s.active) === -1 ? 0 : list.findIndex(s => s.active);
        const nextItem = list.find((_s, i) => i === currentIndex + 1);
        if (nextItem) {
            setList(list.map((s, i) => i === currentIndex + 1 ? { ...s, active: true } : { ...s, active: false }));
            setVideoObj({
                url: nextItem.problemPath,
                interpretation: false
            })
        } else {
            setBVisible(true)
        }
    }

    //答题
    async function answerQuestions(answer: any) {
        const currentItem = list.find(s => s.active) || list[0];
        if (!currentItem) return
        let formData = new FormData();
        formData.append("courseUuid", currentItem.courseUuid);
        formData.append("titleUuid", currentItem.uuid);
        formData.append("userAnswer", answer);
        return await LearningServices.answerQuestions(formData);
    }

    function showDTCard() {
        setVisible(true)
    }

    function chooseTitle(s: ITitle) {
        setList(list.map(item => item.uuid === s.uuid ? { ...item, active: true } : { ...item, active: false }));
        setVisible(false)
    }

    const currentQuestion = list.find(s => s.active) || list[0];
    const activeIndex = list.findIndex(s => s.active) === -1 ? 0 : list.findIndex(s => s.active);

    return (
        <div>
            <LearningWrapper title={props?.course?.name} className={styles['learn-vidreact-playereo']}>
                <audio ref={rightAudio} style={{ display: 'none' }} src={require('@/assets/audios/you_pick_the_right_answer.mp3')}></audio>
                <audio ref={wrongAudio} style={{ display: 'none' }} src={require('@/assets/audios/you_pick_the_wrong_answer.mp3')}></audio>
                <Badge visible={BVisible} courseUuid={props.course?.uuid} closeBadge={() => setBVisible(false)} />
                <div className={styles['dtcard']} onClick={() => showDTCard()}>
                    <img src={require('@/assets/imgs/card.d252ffbf.png')} alt="" />
                </div>
                <div className={styles['video-wrapper']}>
                    {
                        currentQuestion?.problemPath &&
                        <img
                            // src={videoObj?.url}
                            src={videoObj?.url}
                            className='react-player'
                            width='100%'
                            height='100%'
                        />
                    }
                    {
                        props?.course?.showCount ? <span className={styles["l-number-for-text"]}>{activeIndex + 1}/{list?.length}</span> : null
                    }
                </div>
                <div className={styles['l-button-container']}>
                    {
                        options.map(s =>
                            <div key={s.key}
                                className={`
                                ${styles['l-btn-default']} 
                                ${styles['l-btn-type-1']} 
                                ${s.active ? styles['active'] : {}}
                                ${s.status === "correct" ? styles['correct'] : s.status === "error" ? styles['error'] : {}}
                                `} onClick={() => selectOption(s.key)}>
                                <div className={`${styles['btn-text']} ${s.active ? styles['btn-text-active'] : {}}`}>
                                    {s.key}
                                </div>
                            </div>)
                    }
                </div>

                <Dtcard
                    visible={visible}
                    list={list}
                    chooseTitle={(s: ITitle) => chooseTitle(s)}
                    onCancel={() => setVisible(false)} />
            </LearningWrapper >
        </div>
    );
}