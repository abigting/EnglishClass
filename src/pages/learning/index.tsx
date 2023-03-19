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
    type: number;
}

function Lesson(props: IProps) {
    const [questions, setQuestions] = useState([]);
    const [course, setCourse] = useState<ICourse>({
        playTimes: '',
        name: '',
        audioPath: '',
        type: 1,
    });
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
    return <div>
        {
            match?.params?.type === '1' ? <LessonAudio course={course} /> :
                match?.params?.type === '2' ? <LessonVideo course={course} /> :
                    <LessonQuestion course={course} />
        }
    </div>
}

export default withRouter(Lesson);