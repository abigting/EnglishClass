import request from '@/utils/request';

/**
 * @desc 获取列表
 */
export function fetchDeviceGroupList() {
    return request(`/device/group`, {
        method: 'post',
        // ...option,
      });
  }