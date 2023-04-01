import { useEffect, useState } from 'react';
import { withRouter } from 'umi';
import LessonAudio from '@/components/lesson-audio';
import LessonVideo from '@/components/lesson-video';
import LessonQuestion from '@/components/lesson-question';
import { LearningServices } from '@/services';
import qs from 'query-string'
import { ICourse } from '@/utils/type';
import styles from './index.less';

interface IProps {
    location: any;
    match: any;
}

function Lesson(props: IProps) {
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

    function renderContent(type: string) {
        if(course) {
            switch (type) {
                case '1':
                    return <LessonVideo course={course} />;
                case '2':
                    return <LessonAudio course={course} />;
                case '3':
                    return <LessonQuestion course={course} />;
            }
        }
    }

    const { match } = props;

    return <div>
        {
            course && renderContent(match?.params?.type)
        }
    </div>
}

export default withRouter(Lesson);