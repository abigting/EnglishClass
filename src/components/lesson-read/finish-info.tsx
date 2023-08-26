import { history } from 'umi';
import styles from './index.less';

interface IProps {
    visible: boolean,
    uuid: string | null | undefined;
}

export default function Add(props: IProps) {

    if (!props.visible) return null
    return (
        <div className={styles['finish-info-mask']}>
            <div
                className={styles['finish-info-modal']}
            >
                <div className={styles['finish-info-modal-content']}>
                    你真棒，让我们进入下一个内容吧
                </div>
                <div className={styles['finish-info-modal-btn']} onClick={() => history.push(`/classDetail?uuid=${props.uuid}`)}>
                    OK
                </div>
            </div>
        </div>
    );
}
