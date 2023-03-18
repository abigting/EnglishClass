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
        data: data
        // ...option,
    });
}