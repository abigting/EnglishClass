import { useEffect, useState } from 'react';
import { withRouter } from 'umi';
import LessonAudio from '@/components/lesson-audio';
import LessonVideo from '@/components/lesson-video';
import LessonQuestion from '@/components/lesson-question';
import LessonRead from '@/components/lesson-read';
import { LearningServices } from '@/services';
import qs from 'query-string'
import { ICourse } from '@/utils/type';
interface IProps {
    location: any;
    match: any;
}

function Lesson(props: IProps) {
    const [course, setCourse] = useState<ICourse>();
    const [playControl, setPlayControl] = useState<any>();
    useEffect(() => {
        getInfo();
        showPlayControlFn();
    }, [])

    async function getInfo() {
        const { uuid } = qs.parse(props?.location?.search);
        const res = await LearningServices.courseDetail({ uuid });
        if (res.code === 0 && res.data) {
            setCourse(res.data)
        }
    }

    async function showPlayControlFn() {
        const { uuid } = qs.parse(props?.location?.search);
        const res = await LearningServices.showPlayControl({ courseUuid: uuid });
        if (res.code === 0 && res.data) {
            setPlayControl(res.data)
        }
    }

    function renderContent(type: string) {
        if (course) {
            switch (type) {
                case '1':
                    return <LessonVideo course={course} playControl={playControl} />;
                case '2':
                    return <LessonAudio course={course} playControl={playControl} />;
                case '3':
                    return <LessonQuestion course={course} />;
                case '4':
                    return <LessonRead course={course} />;
                case '5':
                    return <LessonRead muted={true} course={course} />;
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