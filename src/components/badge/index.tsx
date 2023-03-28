import { useEffect, useState } from 'react';
import { LearningServices } from '@/services';
import { Rate } from 'antd';
import styles from './index.less';

export default function Badge(props: any) {
    const [userRate, setUserRate] = useState<any>()
    useEffect(() => {
        if (props.visible) {
            getRate()
        }
    }, [props.visible])

    async function getRate() {
        const res = await LearningServices.courserStat({ courseUuid: props.courseUuid });
        if (res.code === 0 && res.data) {
            setUserRate(res.data)
        }
    }

    function closeBadge(){
        props.closeBadge();
        setUserRate({})
    }

    if (!props.visible) return null;

    return (
        <div onClick={()=>closeBadge()}>
            <div className={styles['badge-mask']} />
            <div className={styles['badge-modal']}>
                <div className={styles['badge-content-light']}></div>
                <div className={styles['badge-content']}>
                    <img className={styles['badge-content-star-bg']} src={require('@/assets/imgs/plane-star-bg.3b51704a.png')} alt="" />
                    <Rate className={styles['badge-content-star']} allowHalf value={userRate?.userStar} disabled />
                    <div className={styles['badge-content-text']}>恭喜答题结束</div>
                </div>
            </div>
        </div>
    );
}
