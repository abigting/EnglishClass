import { Modal } from 'antd';
import { ITitle } from '@/utils/type';
import style from './index.less';

interface IProps {
    visible: boolean;
    list: any;
    onCancel: any;
    chooseTitle: any;
}

export default function Index(props: IProps) {


    const list = props?.list || [];
    return <Modal
        // title="答题卡"
        footer={null}
        width="400px"
        open={props.visible}
        onCancel={() => props.onCancel()}>
        <p className={style['dt-title']}>切换题目</p>

        <div className={style['dt-content']}>
            {
                list.map((s: ITitle, i: number) =>
                    <span key={s.uuid} className={style['circle']} onClick={() => props.chooseTitle(s)}>
                        {i + 1}
                    </span>)
            }
        </div>
    </Modal>
}