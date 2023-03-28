import request from '@/utils/request';
import { url } from '@/utils/config';

/**
 * @desc 登录注册
 */
export function login(data: any) {
    return request(`${url}/user/login`, {
        method: 'post',
        data
    });
}

/**
* @desc 注册
*/
export function register(data: any) {
    return request(`${url}/user/register`, {
        method: 'post',
        data
    });
}

