import { useEffect, useState } from 'react';
import { useLocation, history } from 'umi';
import qs from 'query-string'
// import { connect } from 'dva';
import { LearningServices } from '@/services';
import AnswerResult from '@/components/answer-result';
import AnswerResultOptional from '@/components/answer-result/optional';
import { ICourse } from '@/utils/type';
import MJ from '@/assets/imgs/800.d1ecb553.png';
import MJN from '@/assets/imgs/800-normal.46eec15c.png'
import XF from '@/assets/imgs/801.8c70aba7.png'
import XFN from '@/assets/imgs/801-normal.8d619adc.png'
import BD from '@/assets/imgs/803.09130ece.png'
import BDN from '@/assets/imgs/803-normal.f8994ff2.png'
import styles from './index.less';
import { message } from 'antd';

const blocksDefault = [
    {
        img: MJ,
        disableImg: MJN,
        text: '秘籍',
        type: 1,
    },
    {
        img: XF,
        disableImg: XFN,
        text: '心法',
        type: 2,
    },
    {
        id: 3,
        img: BD,
        disableImg: BDN,
        text: '大侠表达',
        type: 3,
    },
    // {
    //     id: 4,
    //     img: 'https://bhbl.dayuan1997.com/img/815.47abf77e.png',
    //     disableImg: BDN,
    //     text: '跟读功',
    //     type: 4,
    // },
    // {
    //     id: 5,
    //     img: BD,
    //     disableImg: 'https://bhbl.dayuan1997.com/img/zidu.9b1dedab.png',
    //     text: '自读功',
    //     type: 5,
    // }
];

const BLOCL_LABLE = {
    1: '大闯关',
    2: '少侠通关',
    3: '大侠表达',
    4: '指读功'
}

interface IBlocks {
    img: string;
    disableImg: string;
    text: string;
    type: number;
    disabled?: boolean
}

function ClassDetail(_props: any) {
    const [course, setCourse] = useState<ICourse>();
    const [blocks, setBlocks] = useState<IBlocks[]>([]);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    // const { user, loading } = useModel('userModel');

    useEffect(() => {
        getDetailInfo();
    }, [])

    async function getDetailInfo() {
        const { uuid } = qs.parse(location.search);
        if (!uuid) return;
        Promise.all([await LearningServices.courseDetail({ uuid }), await LearningServices.showPlayControl({ courseUuid:uuid })]).then((result) => {
            const res = result[0];
            const res1 = result[1];
            if (res.code === 0 && res.data) {
                setCourse(res.data);
                const { videoPath, audioPath, list, type } = res.data;
                let blocks = blocksDefault;
                if (!videoPath) {
                    blocks = blocks.filter(s => s.type !== 1);
                }
                if (!audioPath) {
                    blocks = blocks.filter(s => s.type !== 2);
                }
                if (!list || list.length === 0) {
                    blocks = blocks.filter(s => s.type !== 3);
                } else {
                    blocks = blocks.map(s => s.type === 3 ? { ...s, text: BLOCL_LABLE[type] } : s)
                }
                if (res1?.data) {
                    const { data={} } = res1;
                    const { audioNumYu, videoNumYu } = data;
                    if(videoNumYu >0 && videoPath){
                        blocks = blocks.map((s) => s.type ===2 ? { ...s, disabled: true } : s)
                    }
                    if(audioNumYu >0 && audioPath){
                        blocks = blocks.map((s) => s.type ===3 ? { ...s, disabled: true } : s)
                    }
                }
                setBlocks(blocks)
            }
        })
    }

    function showAnswerRes() {
        setVisible(true);
    }

    function learningDetail(s: IBlocks) {
        if (s.disabled) {
            message.info('请按顺序闯关')
        } else {
            history.push(`/learning/${s.type}?uuid=${course?.uuid}`)
        }
    }
    let { uuid } = qs.parse(location.search);
    if (Array.isArray(uuid)) {
        uuid = uuid[0]
    }

    if (!uuid || !course) return null
    return <div className={styles['lesson-wrapper']}>
        <div className={styles['lesson-wall']} />
        <div className={styles['lesson-land']} />
        <div className={styles['lesson-land-circle']} />
        <div className={styles['lesson-land-report']} onClick={() => showAnswerRes()}>
            <div className={styles['lesson-cursor']}>
                通关报告
            </div>
        </div>
        <div className={styles['left-bar']} />
        <div className={styles['right-bar']} />
        <div className={styles['left-footer']} />
        <div className={styles['right-footer']} />
        <div className={styles['lesson-back']}>
            <div className={styles['back-1']} />
            <div className={styles['back-2']} />
            <div className={styles['back-3']} />
            <div className={styles['back-4']} onClick={() => history.back()} />
        </div>
        <div className={styles['lesson-section']}>
            <div className={styles['section-scroll']}>
                <div className={styles['section-view']}>
                    <div className={styles['lesson-info']}>
                        <img className={styles['lesson-info-bg']} src={require('@/assets/imgs/l-lesson-section.2b823d92.png')} alt="" />
                        <div className={styles['lesson-info-name']}>
                            {course.name}
                        </div>
                        <div className={styles['lesson-info-content']}>
                            {
                                blocks.map(s =>
                                    <div key={s.type} className={styles['lesson-info-content-block']} onClick={() => learningDetail(s)}>
                                        <div className={styles['element-img']}>
                                            {/* <div className={styles['element-sign']}>0/1</div> */}
                                            {
                                                s.disabled && s.disableImg ? <img src={s.disableImg} alt="" /> : <img src={s.img} alt="" />
                                            }
                                        </div>
                                        <div className={styles['element-text']}>
                                            <span>{s.text}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
        {
            course.type !== 3 ? <AnswerResultOptional visible={visible} courseUuid={uuid} closeModal={() => setVisible(false)} /> :
                <AnswerResult visible={visible} courseUuid={uuid} closeModal={() => setVisible(false)} />
        }
    </div>
}

export default ClassDetail;