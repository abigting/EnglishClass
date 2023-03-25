import { ReactElement, ReactFragment, ReactPortal } from 'react';
import { history } from 'umi';
import styles from './index.less';

interface TProps {
    children: ReactElement | ReactFragment;
    title: string;
    className: any | undefined;
}

export default function Learning(props: TProps) {

    const { title, children, className } = props;

    return <div className={styles['learn-bg']}>
        <div className={styles['learn-container']}>
            <div className={styles['learn-left']}>
                <div className={styles['learn-title']}>
                    <div className={styles['learn-title-header']}>
                        {title}
                    </div>
                    {/* <span className={styles['back']}></span> */}
                </div>
                <div className={styles['learn-area']}>
                    <div>
                        <div className={`${styles['learn-area-left-post']}`}>
                            <img src={require('@/assets/imgs/learn-left-hand.ec83703e.png')} className={`${styles['learn-left-hand']} ${styles['learn-img-info']}`} />
                            <div className={`${styles['left-post-board']}`} onClick={() => history.back()}></div>
                        </div>
                        <div className={`${styles['learn-area-right-post']}`}>
                            <img src={require('@/assets/imgs/learn-right-hand.f56a4367.png')} className={`${styles['learn-right-hand']} ${styles['learn-img-info']}`} />
                            <div className={`${styles['right-post-board']} ${styles['learn-img-info']}`}></div>
                        </div>
                        <div className={`${styles['learn-bottom-light']}`} />
                        <div className={`${styles['learn-area-bottom']}`} />
                    </div>
                    <div className={`${styles['learn-content-container']} ${className}`}>
                        {children}
                    </div>
                </div>
            </div>
            <span className={styles['refresh-container']} onClick={() => location.reload()}>
                <img src="data:image/png;base64,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" alt=""></img>
            </span>
        </div>
    </div>
}