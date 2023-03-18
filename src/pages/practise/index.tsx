import Wrapper from '@/components/wrapper';
import { history } from 'umi';
import { Rate} from 'antd';
import styles from './index.less';

export default function Home() {

    const classs = [
        {
            id: 1,
            title: '第41关卡 - 大侠7段',
            img: 'https://bhbl-prod.oss-accelerate.aliyuncs.com/%E8%AF%AD%E8%AF%BE/07GZG07/GZG07041%23%E6%96%B0%E8%AF%BE/GZG07041.jpg?Expires=3089631899&OSSAccessKeyId=LTAI4GGtSGUKaH8yBZViDdp3&RI8Z5kima26Ihg0y1JBfUQ2OYpc%3D',
            rate: 4
        },
        {
            id: 2,
            title: '第41关卡 - 大侠7段',
            img: 'https://bhbl-prod.oss-accelerate.aliyuncs.com/%E8%AF%AD%E8%AF%BE/07GZG07/GZG07041%23%E6%96%B0%E8%AF%BE/GZG07041.jpg?Expires=3089631899&OSSAccessKeyId=LTAI4GGtSGUKaH8yBZViDdp3&RI8Z5kima26Ihg0y1JBfUQ2OYpc%3D',
            rate: 3
        },
        {
            id: 3,
            title: '第41关卡 - 大侠7段',
            img: 'https://bhbl-prod.oss-accelerate.aliyuncs.com/%E8%AF%AD%E8%AF%BE/07GZG07/GZG07041%23%E6%96%B0%E8%AF%BE/GZG07041.jpg?Expires=3089631899&OSSAccessKeyId=LTAI4GGtSGUKaH8yBZViDdp3&RI8Z5kima26Ihg0y1JBfUQ2OYpc%3D',
            rate: 5
        },
        {
            id: 4,
            title: '第41关卡 - 大侠7段',
            img: 'https://bhbl-prod.oss-accelerate.aliyuncs.com/%E8%AF%AD%E8%AF%BE/07GZG07/GZG07041%23%E6%96%B0%E8%AF%BE/GZG07041.jpg?Expires=3089631899&OSSAccessKeyId=LTAI4GGtSGUKaH8yBZViDdp3&RI8Z5kima26Ihg0y1JBfUQ2OYpc%3D',
            rate: 4
        },
        {
            id: 5,
            title: '第41关卡 - 大侠7段',
            img: 'https://bhbl-prod.oss-accelerate.aliyuncs.com/%E8%AF%AD%E8%AF%BE/07GZG07/GZG07041%23%E6%96%B0%E8%AF%BE/GZG07041.jpg?Expires=3089631899&OSSAccessKeyId=LTAI4GGtSGUKaH8yBZViDdp3&RI8Z5kima26Ihg0y1JBfUQ2OYpc%3D',
            rate: 1
        }
    ]

    const menus=[
        {
            key:'1',
            title:'Audio'
        },
        {
            key:'2',
            title:'Video'
        },
        {
            key:'3',
            title:'Selection'
        }
    ]
    return <Wrapper menus={menus}>
        <div className={styles['class-wrapper']}>
            {
                classs.map(item =>
                    <div key={item.id} className={styles['class-module']} onClick={() => history.push('/classDetail')}>
                        <img className={styles['class-module-bg']} src={'https://bhbl.dayuan1997.com/img/list-bg.5a909275.png'} alt="" />
                        <div className={styles['class-title']}>
                                {item.title}
                            </div>
                            <div className={styles['class-content']}>
                                <img className={styles['class-content-cover']} src={item.img} alt="" />
                                <div className={styles['class-content-rate']} >
                                <Rate value={item.rate}/>
                                </div>
                            </div>
                    </div>)
            }
        </div>
    </Wrapper>
}