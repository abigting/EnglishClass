import request from '@/utils/request';
import { url } from '@/utils/config';

/**
 * @desc 获取列表
 */
export function fetchCourselist() {
    return request(`${url}/course/manager_list`, {
        method: 'get',
        // ...option,
    });
}

/**
* @desc 新增课程
*/
export function courseCreate(data: any) {
    return request(`${url}/course/createForm`, {
        method: 'post',
        data
        // ...option,
    });
}

/**
* @desc 编辑课程
*/
export function courseEdit(data: any) {
    return request(`${url}/course/edit`, {
        method: 'post',
        data
    });
}

/**
* @desc 删除课程
*/
export function courseDelete(data: any) {
    return request(`${url}/course/delete`, {
        method: 'post',
        data
        // ...option,
    });
}

/**
* @desc 新增题目
*/
export function titleCreate(data: any) {
    return request(`${url}/title/createForm`, {
        method: 'post',
        data
        // ...option,
    });
}

/**
* @desc 编辑题目
*/
export function titleEdit(data: any) {
    return request(`${url}/title/edit`, {
        method: 'post',
        data
        // ...option,
    });
}

/**
* @desc 新增题目
*/
export function titleDelete(data: any) {
    return request(`${url}/title/delete`, {
        method: 'post',
        data
        // ...option,
    });
}

/**
* @desc 课程详情
*/
export function courseDetail(data: any) {
    return request(`${url}/course/detail_data`, {
        method: 'get',
        params: data
    });
}

/**
* @desc 获取题目
*/
export function titleDeatil(data: any) {
    return request(`${url}/title/detail_title`, {
        method: 'get',
        params: data
        // ...option,
    });
}


/**
* @desc 课程列表
*/
export function courseList(data: any) {
    return request(`${url}/course/showList`, {
        method: 'get',
        params: data
        // ...option,
    });
}

/**
* @desc 答题
*/
export function answerQuestions(data: any) {
    return request(`${url}/user_answer/answer_questions`, {
        method: 'post',
        data
        // ...option,
    });
}


/**
* @desc 答题结果列表
*/
export function recordList(data: any) {
    return request(`${url}/user_answer/record_list`, {
        method: 'post',
        data
    });
}


/**
* @desc 播放顺序控制
*/
export function playControl(data: any) {
    return request(`${url}/course/play_control`, {
        method: 'post',
        data
    });
}

/**
* @desc 用户成绩
*/
export function courserStat(data: any) {
    return request(`${url}/user_metric/courser_stat`, {
        method: 'post',
        data
    });
}

