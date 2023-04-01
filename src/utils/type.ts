interface ICourse {
    id: number;
    uuid: string;
    name: string;
    type: number;
    audioPath: string;
    videoPath: string;
    coverPath: string;
    orderNum: number;
    playTimes: number;
    list: ITitle[];
    oneStarScore?: number;
    oneTitleScore?: number;
    showCount?: boolean;
    createTime?: string | null;
    updateTime?: string | null;
    allScore?: string | number;
    userScore?: string | number;
    userStar?: number;
}

interface ITitle {
    id: number;
    uuid: string;
    name: string;
    courseUuid: string;
    type: number;
    problemPath: string;
    interpretationPath?: string;
    answer?: string;
    orderNum: number;
    active?: boolean;
    createTime?: string | null;
    updateTime?: string | null;
}

interface IOption {
    key: string,
    active?: boolean | null,
    status?: string | null
}


interface IVideoObj {
    url?: string
    interpretation?: boolean;
}

interface DataType extends ICourse {
    children?: ITitle[];
}

interface IMenu {
    key: string,
    title: string,
    active?: boolean
}

export{
    ICourse,
    ITitle,
    IOption,
    DataType,
    IVideoObj,
    IMenu
}