import Wrapper from '@/components/wrapper';
import { history } from 'umi';
import styles from './index.less';

export default function Test() {

    return <Wrapper menus={[]}>
        <div className={styles['menu-wrapper']}>
            <div className={styles['menu-btn']} onClick={() => history.push('/lessonManagement')}>
                课程维护
            </div>
            <div className={styles['menu-btn']} onClick={() => history.push('/practise')}>
                课程练习
            </div>
        </div>
    </Wrapper>
}