import {withRouter} from 'umi';
import LessonAudio from '@/components/lesson-audio';
import LessonVideo from '@/components/lesson-video';
import LessonQuestion from '@/components/lesson-question';
import styles from './index.less';

 function Lesson(props: any) {

    const type = 1;

    const { match } = props;
    console.log(match?.params?.type, 'match?.params?.type')
    return <div>
        {
            match?.params?.type === '1' ? <LessonAudio /> :  match?.params?.type === '2' ? <LessonVideo /> : <LessonQuestion />
        }
    </div>
}

export default withRouter(Lesson);