import AudioQuestion from './audio-question';
import OptionalQuestion from './optional-question';

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

export default function Index(props: IProps){
    return props?.course?.type ===3 ? <AudioQuestion {...props}/> : <OptionalQuestion {...props}/>
}