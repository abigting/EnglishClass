import { ReactElement, ReactFragment } from 'react';
import { history } from 'umi';
import styles from './index.less';

interface TProps {
    children: ReactElement | ReactFragment;
}

const blocks = [
    {
        id: 1,
        img: 'https://bhbl.dayuan1997.com/img/801.8c70aba7.png',
        text: '心法'
    },
    {
        id: 2,
        img: 'https://bhbl.dayuan1997.com/img/815.47abf77e.png',
        text: '大侠表达'
    },
    {
        id: 3,
        img: 'https://bhbl.dayuan1997.com/img/815.47abf77e.png',
        text: '答题'
    }
]

export default function Lesson(props: TProps) {
    return <div className={styles['lesson-wrapper']}>
        <div className={styles['lesson-wall']} />
        <div className={styles['lesson-land']} />
        <div className={styles['lesson-land-circle']} />
        <div className={styles['lesson-land-report']}>
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
            <div className={styles['back-4']}  onClick={() => history.back()}/>
        </div>
        <div className={styles['lesson-section']}>
            <div className={styles['section-scroll']}>
                <div className={styles['section-view']}>
                    <div className={styles['lesson-info']}>
                        <img className={styles['lesson-info-bg']} src="https://bhbl.dayuan1997.com/img/l-lesson-section.2b823d92.png" alt="" />
                        <div className={styles['lesson-info-name']}>
                            Aqua Ape(38-41)
                        </div>
                        <div className={styles['lesson-info-content']}>
                            {
                                blocks.map(s =>
                                    <div key={s.id} className={styles['lesson-info-content-block']}  onClick={() => history.push('/learning')}>
                                        <div className={styles['element-img']}>
                                            <div className={styles['element-sign']}>0/1</div>
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

    </div>
}