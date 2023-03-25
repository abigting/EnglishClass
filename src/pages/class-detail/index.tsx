import { useEffect, useState } from 'react';
import { useLocation, history } from 'umi';
import qs from 'query-string'
// import { connect } from 'dva';
import { LearningServices } from '@/services';
import AnswerResult from '@/components/answer-result';
import AnswerResultOptional from '@/components/answer-result/optional';
import styles from './index.less';

const blocksDefault = [
    {
        img: 'https://bhbl.dayuan1997.com/img/800.d1ecb553.png',
        text: '秘籍',
        type:1,
    },
    {
        img: 'https://bhbl.dayuan1997.com/img/801.8c70aba7.png',
        text: '心法',
        type:2,
    },
    {
        id: 3,
        img: 'https://bhbl.dayuan1997.com/img/803.09130ece.png',
        text: '大侠表达',
        type:3,
    }
]

interface IBlocks{
    img: string;
    text: string;
    type: number
}

function ClassDetail(props: any) {
    const [course, setCourse] = useState({});
    const [blocks, setBlocks] = useState<IBlocks[]>([]);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    // const { user, loading } = useModel('userModel');

    useEffect(() => {
        // console.log(test, 'test')
        getDetailInfo()
    }, [])

    async function getDetailInfo() {

        const { uuid } = qs.parse(location.search);

        // dispatch({
        //     type: 'global/getCourseDetail',
        //     payload: {
        //         uuid
        //     }
        //   })
        const res = await LearningServices.courseDetail({ uuid });
        if (res.code === 0 && res.data) {
            setCourse(res.data);
            const { videoPath, audioPath, list } = res.data;
            let blocks = blocksDefault;
            if (!videoPath) {
                blocks = blocks.filter(s => s.type !== 1);
            }
            if (!audioPath) {
                blocks = blocks.filter(s => s.type !== 2);
            }
            if (!list || list.length === 0) {
                blocks = blocks.filter(s => s.type !== 3);
            }
            setBlocks(blocks)
        }
    }

    function showAnswerRes() {
        setVisible(true);
    }
    const { uuid } = qs.parse(location.search);

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
                                    <div key={s.type} className={styles['lesson-info-content-block']} onClick={() => history.push(`/learning/${s.type}?uuid=${course.uuid}`)}>
                                        <div className={styles['element-img']}>
                                            {/* <div className={styles['element-sign']}>0/1</div> */}
                                            <img src={s.img} alt="" />
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

// function mapStateToProps({ global }) {
//     return {
//       ...global
//     };
//   }

// export default connect(mapStateToProps)(ClassDetail);
export default ClassDetail;