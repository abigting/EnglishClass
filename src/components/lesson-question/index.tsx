import { Link, Outlet } from 'umi';
import React, { useState } from 'react';
import { Button, Modal, Radio, Form, Input, InputNumber, Upload, Table } from 'antd';
import ReactPlayer from 'react-player';
import LearningWrapper from '@/components/wrapper/learning';
// import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';


interface DataType {
    key: React.ReactNode;
    name: string;
    address: string;
    answer: string;
    children?: DataType[];
}

export default function Add() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <div className={styles['lSoundRecording-btn']}><div className={styles['l-recorder-container']}>
                    <div className={`${styles['btn-recorder']} ${styles['default']}`}>
                        <span className={styles['text']}>
                            点击按钮回答问题
                        </span>
                    </div>
                </div>
                </div>
            </LearningWrapper >
        </div>
    );
}


{/* <img data-v-2dbf3b12="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA6CAMAAADiHHsGAAAAkFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+WABnwAAAAL3RSTlMA5rq3lpzjk6uwfm7x7cOOXxMOzFIF9umoool6czEbFwPa1c4rwLZlV0Y/VUpIJ7lpOiYAAAFtSURBVDjL7dXLcoIwGIbhD0XOFVQQQUS0nnv47v/uWgIMBkJZdOu7MYtnkjgZf/HcMkhWhrFKgiUGcmPWxZkSRBc+NY0UZEWp976w2Mnqii/2+uyQQ58cZLGjop1EHBVxJLJREfnCExWZSGT6Ii8CfFt+8QfxrROO5HaYZOQBHpkMk4T0oJH6MNFJY4SYLZmMk4uKTCUyU5FZS0zgqiLXmsSkDyxUZA/4ZFzuMlH/Yq3qYTTYFd+rNhGb2wgpLoOgKwKIq/ADhUcyB7CVxRZATtIrALeZfcG6BeugmZBuuTBI6uUi198q8KbngHggau0Q86vxHTq67oTV8PbbYSaOor2A1MKmOKYuFbu7UQsKV5yZoq75Nkb6WIrjHqnRn4dhfVHvOJ8fvfrSYefoWe+dF+h2MjWySTNPUBXdHWtNrjfOPcJwc3Jefv6PnMnzCFmJN1V3M2e/2eItypV+G/nfE1IWGRVlEtloiiyIfgBAubwSlVZ/mQAAAABJRU5ErkJggg==" alt="" class="wave-img"></img> */}
{/* <img src="data:image/gif;base64,R0lGODlhIQAYAJEAAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAACACwAAAAAIQAYAAACQJSPqcuNAZ1csIaJha3ZbdsxH4iNJimd6jWtZ+mOcLzNNNfeqKfjaR/JAW26DJAVSqiSIhmT8nk2atImsooVFAAAIfkEBRQAAgAsFwAGAAUACwAAAg1UhKFo25ecgvPFUxMrACH5BAUUAAIALBsABAAFAA8AAAIRjCUWmIf6HIzMtbjampBnUQAAOw==" class="l-image-voice"></img> */}
{/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAaCAYAAABctMd+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU0MTdEQjBEMTkzMTFFQkE2OUZDOUU2NzdFOEFBQTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU0MTdEQjFEMTkzMTFFQkE2OUZDOUU2NzdFOEFBQTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RTQxN0RBRUQxOTMxMUVCQTY5RkM5RTY3N0U4QUFBNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RTQxN0RBRkQxOTMxMUVCQTY5RkM5RTY3N0U4QUFBNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnKgyIwAAAHpSURBVHjapJXNK0RhFMbvfCnTCI0sFFImpSQLY1KaleIPkAxbURZYWJIUCwtKWbCzkGJjIxtmrGnKglIo8lGKaGJiMNdzpnPzzp37OffU797m3nOf98x5zzmvJMuyZAMfmAUX4BSMAbeev2RTfEUutH0QdCruAR+ytt2CiBPxctnYMmASuJRvvJK5NYAIaDLx84ElEAaDIKsXJa3eB47l4qyfdNwaEdSAQ7AN2qXirIMu6rQ0gjio5d8ZsAF2QRokLIrf5K5CKirApfDX4qBeeN9iMSVnIKCuljXBYRN4VftgRXyLg8wrxWbwzQ5JUKKxyXUGom8gplfnYud1GdR6QkP4SJW+AnEl19cmjRTklL2AOzBuNlv8IMvi6zZnjZpSHmZhpUOrgItL6EFyZhNgAaRAkJroR3jpdyiujIgS0iXxJ/DJD0MOxUNiBkj8F5zww24H0VcL4yKpiJPt8D0ARosUn+LJ+K/Hu0wVc88Vk+KmslMlnTzPya6U7hYdYkJj0EJtFoWj4Jm/o5Lu0TuJloUF6EibAWUGDbUoREw2J/rkjiTBPGAVjAjP0jyGz8Er90UriHLJ5bIL5sF03i7oRDUAHi2OWBoZvXZPf9rkYXAA3lWCtOl7YEhngmqmxcgqmS+rY+JPgAEAqtb2LwUVw3UAAAAASUVORK5CYII=" class="l-image-replay"></img> */}

// background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAB1AgMAAADyyGPNAAAADFBMVEXs8PnhfjD0xUymUh+HXMJIAAAAFklEQVQI12NwwAEPYMCBBg54YANhCAA5MRZBgT4zFAAAAABJRU5ErkJggg==) repeat-x;