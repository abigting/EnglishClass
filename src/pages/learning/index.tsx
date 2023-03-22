import { useEffect, useState } from 'react';
import { withRouter } from 'umi';
import LessonAudio from '@/components/lesson-audio';
import LessonVideo from '@/components/lesson-video';
import LessonQuestion from '@/components/lesson-question';
import { LearningServices } from '@/services';
import qs from 'query-string'
import styles from './index.less';


interface IProps {
    location: any;
    match: any
}

interface ICourse {
    playTimes: string;
    name: string;
    audioPath: string;
    videoPath: string;
    type: number;
    list: any
}

function Lesson(props: IProps) {
    const [questions, setQuestions] = useState([]);
    const [course, setCourse] = useState<ICourse>();
    useEffect(() => {
        getInfo()
    }, [])

    async function getInfo() {
        const { uuid } = qs.parse(props?.location?.search);
        const res = await LearningServices.courseDetail({ uuid });
        if (res.code === 0 && res.data) {
            setCourse(res.data)
        }
    }

    const type = 1;

    const { match } = props;

    if(!course) return;
    return <div>
        {
            match?.params?.type === '1' ? <LessonVideo course={course} /> :
                match?.params?.type === '2' ? <LessonAudio course={course} /> :
                    <LessonQuestion course={course} />
        }
    </div>
}

export default withRouter(Lesson);