import { ReactElement, ReactFragment } from 'react';
import { history } from 'umi';
import styles from './index.less';

interface TProps {
    children: ReactElement | ReactFragment;
    menus?: any;
    toggleMenu?: any;
}

export default function Home(props: TProps) {

    return <div className={styles['home-wrapper']}>
        <div className={styles['home-nav']}>
            <img className={styles['home-nav-top']} src="https://bhbl.dayuan1997.com/img/sucker.fbe6e7a2.png" alt="" />
            <img className={styles['home-nav-top-border']} src={require("@/assets/imgs/level-select.png")} alt="" />
            <img className={styles['back-btn']} src="https://bhbl.dayuan1997.com/img/back.b6f5dd88.png" alt="" onClick={() => history.back()} />
        </div>
        {
            props.menus &&
            <div className={styles['home-menu']}>
                {
                    props.menus.map((s: any, i: number) =>
                        <span key={s.key}
                            className={`${styles['home-menu-tab']} 
                            ${i === 0 ? styles['first'] :i === 1 ? styles['middle']: styles['last']}
                            ${i === 0 && s.active ? styles['first-active'] :i === 1 && s.active ? styles['middle-active']: s.active?styles['last-active']:{}}
                            `}
                            onClick={() => props.toggleMenu(s.key)}>
                            {s.title}
                        </span>)
                }
            </div>
        }
        <div className={styles['home-container']}>
            <div className={styles['home-left-pillar']} />
            <div className={styles['home-center']}>
                {props.children}
            </div>
            <div className={styles['home-right-pillar']} />
        </div>
    </div>
}