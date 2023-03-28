import TextOptionalQuestion from './text-optional-question';
import OptionalQuestion from './optional-question';
import AudioQuestion from './audio-question';

interface IProps {
    course: ICourse;
}

interface ICourse {
    playTimes: string;
    name: string;
    audioPath: string;
    videoPath: string;
    type: number;
    list: any;
}

export default function Index(props: IProps) {
    function renderQuestion(type: number) {
        switch (type) {
            case 1:
                return <TextOptionalQuestion {...props} />;
            case 2:
                return <OptionalQuestion {...props} />;
            case 3:
                return <AudioQuestion {...props} />;
            default:
                return null
        }
    }
    return renderQuestion(props?.course?.type)
}