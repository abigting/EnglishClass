import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { message } from 'antd';
import ReactPlayer from 'react-player';
import LearningWrapper from '@/components/wrapper/learning';
import Recorder from 'js-audio-recorder';
import useLongPress from "./longPress";

// import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';


interface DataType {
    key: React.ReactNode;
    name: string;
    address: string;
    answer: string;
    children?: DataType[];
}

const optionsDefault = [{
    key:'A',
    active: false
},{
    key:'B',
    active: false
},{
    key:'C',
    active: false
}];

export default function Add() {
    const [recording, setRecording] = useState(false);
    const [options, setOptions] = useState(optionsDefault);
    const [recorder, setRecorder] = useState(new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1, // 声道，支持 1 或 2， 默认是1
        // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    }));

    const longPressHandler = useLongPress(
        () => {
            console.log('点击开始')
            startRecordAudio()
            setRecording(true)
        },
        () => {
            console.log('长按事件')
        },
        () => {
            setRecording(false)
            // message.warning('当前录音时间太短，请继续录音~')
        },
        () => {
            console.log('结束长按事件')
            setRecording(false)
        });

    //开始录音
    function startRecordAudio() {
        Recorder.getPermission().then(
            () => {
                console.log("开始录音");
                recorder.start(); // 开始录音
            },
            (error: { name: any; message: any; }) => {
                console.log(error, 'error')
                message.info("请先允许该网页使用麦克风")
            }
        );
    }

    //选择题 选择答案
    function selectOption(key: string){
         setOptions(options.map(s=> s.key === key? {...s, active: true}:{...s, active: false}))
    }


    const btnBg = {
        default: "https://bhbl.dayuan1997.com/img/default.1df9dcc3.png",
        active: 'https://bhbl.dayuan1997.com/img/active_light.a95ba7f5.png'
    }

    const renderOperation =(type: string)=>{
        switch (type){
            case '1':
                return <div className={styles['lSoundRecording-btn']}>
                <div className={styles['l-recorder-container']} >
                    <div className={`${styles['btn-recorder']} ${styles['default']}`}
                        style={{ backgroundImage: recording ? `url(${btnBg.active})` : `url(${btnBg.default})` }}
                        {...longPressHandler}>
                        <div className={`${styles['btn-text']} ${recording ? styles['btn-text-active'] : {}}`}>
                            {
                                recording ? "录音中..." : " 点击按钮回答问题"
                            }
                        </div>
                    </div>
                </div>
            </div>
            case '2':
                return <div className={styles['l-button-container']}>
                {
                    options.map(s =>
                        <div key={s.key}
                            className={`${styles['l-btn-default']} ${styles['l-btn-type-1']} ${s.active ? styles['active'] : {}}`} onClick={()=>selectOption(s.key)}>
                            <div className={`${styles['btn-text']} ${s.active ? styles['btn-text-active'] : {}}`}>
                                {s.key}
                            </div>
                        </div>)
                }
            </div>
        }
    }


    return (
        <div>
            <LearningWrapper title="question" className={styles['learn-vidreact-playereo']}>
                <div className={styles['video-wrapper']}>
                    <ReactPlayer
                        url={require("./../../assets/2023_02_26 20_56_17.mp4")}
                        className='react-player'
                        // playing
                        controls
                        width='100%'
                        height='100%'
                    />
                </div>
                <div className={styles['lSoundRecording-btn']}>
                    <div className={styles['l-recorder-container']} >
                        <div className={`${styles['btn-recorder']} ${styles['default']}`}
                            style={{ backgroundImage: recording ? `url(${btnBg.active})` : `url(${btnBg.default})` }}
                            {...longPressHandler}>
                            <div className={`${styles['btn-text']} ${recording ? styles['btn-text-active'] : {}}`}>
                                {
                                    recording ? "录音中..." : " 点击按钮回答问题"
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* {
                    renderOperation('1')
                } */}
            </LearningWrapper >
        </div>
    );
}


{/* <img data-v-2dbf3b12="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA6CAMAAADiHHsGAAAAkFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+WABnwAAAAL3RSTlMA5rq3lpzjk6uwfm7x7cOOXxMOzFIF9umoool6czEbFwPa1c4rwLZlV0Y/VUpIJ7lpOiYAAAFtSURBVDjL7dXLcoIwGIbhD0XOFVQQQUS0nnv47v/uWgIMBkJZdOu7MYtnkjgZf/HcMkhWhrFKgiUGcmPWxZkSRBc+NY0UZEWp976w2Mnqii/2+uyQQ58cZLGjop1EHBVxJLJREfnCExWZSGT6Ii8CfFt+8QfxrROO5HaYZOQBHpkMk4T0oJH6MNFJY4SYLZmMk4uKTCUyU5FZS0zgqiLXmsSkDyxUZA/4ZFzuMlH/Yq3qYTTYFd+rNhGb2wgpLoOgKwKIq/ADhUcyB7CVxRZATtIrALeZfcG6BeugmZBuuTBI6uUi198q8KbngHggau0Q86vxHTq67oTV8PbbYSaOor2A1MKmOKYuFbu7UQsKV5yZoq75Nkb6WIrjHqnRn4dhfVHvOJ8fvfrSYefoWe+dF+h2MjWySTNPUBXdHWtNrjfOPcJwc3Jefv6PnMnzCFmJN1V3M2e/2eItypV+G/nfE1IWGRVlEtloiiyIfgBAubwSlVZ/mQAAAABJRU5ErkJggg==" alt="" class="wave-img"></img> */ }
{/* <img src="data:image/gif;base64,R0lGODlhIQAYAJEAAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAACACwAAAAAIQAYAAACQJSPqcuNAZ1csIaJha3ZbdsxH4iNJimd6jWtZ+mOcLzNNNfeqKfjaR/JAW26DJAVSqiSIhmT8nk2atImsooVFAAAIfkEBRQAAgAsFwAGAAUACwAAAg1UhKFo25ecgvPFUxMrACH5BAUUAAIALBsABAAFAA8AAAIRjCUWmIf6HIzMtbjampBnUQAAOw==" class="l-image-voice"></img> */ }
{/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAaCAYAAABctMd+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU0MTdEQjBEMTkzMTFFQkE2OUZDOUU2NzdFOEFBQTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU0MTdEQjFEMTkzMTFFQkE2OUZDOUU2NzdFOEFBQTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RTQxN0RBRUQxOTMxMUVCQTY5RkM5RTY3N0U4QUFBNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RTQxN0RBRkQxOTMxMUVCQTY5RkM5RTY3N0U4QUFBNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnKgyIwAAAHpSURBVHjapJXNK0RhFMbvfCnTCI0sFFImpSQLY1KaleIPkAxbURZYWJIUCwtKWbCzkGJjIxtmrGnKglIo8lGKaGJiMNdzpnPzzp37OffU797m3nOf98x5zzmvJMuyZAMfmAUX4BSMAbeev2RTfEUutH0QdCruAR+ytt2CiBPxctnYMmASuJRvvJK5NYAIaDLx84ElEAaDIKsXJa3eB47l4qyfdNwaEdSAQ7AN2qXirIMu6rQ0gjio5d8ZsAF2QRokLIrf5K5CKirApfDX4qBeeN9iMSVnIKCuljXBYRN4VftgRXyLg8wrxWbwzQ5JUKKxyXUGom8gplfnYud1GdR6QkP4SJW+AnEl19cmjRTklL2AOzBuNlv8IMvi6zZnjZpSHmZhpUOrgItL6EFyZhNgAaRAkJroR3jpdyiujIgS0iXxJ/DJD0MOxUNiBkj8F5zww24H0VcL4yKpiJPt8D0ARosUn+LJ+K/Hu0wVc88Vk+KmslMlnTzPya6U7hYdYkJj0EJtFoWj4Jm/o5Lu0TuJloUF6EibAWUGDbUoREw2J/rkjiTBPGAVjAjP0jyGz8Er90UriHLJ5bIL5sF03i7oRDUAHi2OWBoZvXZPf9rkYXAA3lWCtOl7YEhngmqmxcgqmS+rY+JPgAEAqtb2LwUVw3UAAAAASUVORK5CYII=" class="l-image-replay"></img> */ }

// background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAB1AgMAAADyyGPNAAAADFBMVEXs8PnhfjD0xUymUh+HXMJIAAAAFklEQVQI12NwwAEPYMCBBg54YANhCAA5MRZBgT4zFAAAAABJRU5ErkJggg==) repeat-x;