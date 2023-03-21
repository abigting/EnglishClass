import request from '@/utils/request';
import { url } from '@/utils/config';

/**
 * @desc 登录注册
 */
export function login(data: any) {
    return request(`${url}/user/login`, {
        method: 'post',
        data: data
        // ...option,
    });
}

/**
* @desc 新增课程
*/
export function courseCreate(data: any) {
    return request(`${url}/course/create`, {
        method: 'post',
        data: data
        // ...option,
    });
}

