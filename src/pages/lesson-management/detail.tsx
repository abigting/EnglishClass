import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import styles from './index.less';


interface DataType {
    key: React.ReactNode;
    name: string;
    address: string;
    answer: string;
    children?: DataType[];
}

export default function Add() {


    return (
        <div className={styles.navs}>

        </div>
    );
}
