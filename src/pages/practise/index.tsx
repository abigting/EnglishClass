import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/wrapper';
import { history } from 'umi';
import { Rate } from 'antd';
import { LearningServices } from '@/services';
import styles from './index.less';

const menusDefault = [
    {
        key: '1',
        title: '文字',
        active: true
    },
    {
        key: '2',
        title: '音频'
    },
    {
        key: '3',
        title: '语音回答'
    }
]

interface Item {
    id: string | number;
    uuid: string;
    name: string;
    coverPath: string;
    rate: number;
    userScore?: number;
}

export default function Home() {
    const [data, setData] = useState<Item[]>([]);
    const [menus, setMenus] = useState(menusDefault);
    useEffect(() => {
        getList('1');
    }, [])


    async function getList(type: string | undefined) {
        setMenus(menus.map(s => s.key === type ? { ...s, active: true } : { ...s, active: false }))
        const res = await LearningServices.courseList({ type });
        if (res.code === 0) {
            setData(res.data || [])
        }
    }

    return <Wrapper menus={menus} toggleMenu={(type: string) => getList(type)}>
        <div className={styles['class-wrapper']}>
            {
                data.map(item =>
                    <div key={item.id} className={styles['class-module']} onClick={() => history.push(`/classDetail?uuid=${item.uuid}`)}>
                        <img className={styles['class-module-bg']} src={require("@/assets/imgs/list-bg.5a909275.png")} alt="" />
                        <div className={styles['class-title']}>
                            {item.name}
                        </div>
                        <div className={styles['class-content']}>
                            <img className={styles['class-content-cover']} src={item.coverPath} alt="" />
                            {
                                item.userScore ? <div className={styles['class-content-rate']} >
                                    <Rate allowHalf disabled value={item.userScore} />
                                </div> : null
                            }
                        </div>
                    </div>)
            }
        </div>
    </Wrapper>
}