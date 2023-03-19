import { extend } from 'umi-request';
import { message } from 'antd';
// import { getCookie } from './common';

const request = extend({});

request.interceptors.request.use((url, options) => {
  const { headers, ...rest } = options;
  return {
    options: {
      ...rest,
      headers: {
        // token: getCookie('token'),
        userUUId: 'test123',
        ...headers,
      },
    },
  };
});

request.interceptors.response.use(async (response) => {
  try {
    const data = await response.clone().json();
    if (data.code !== 0) {
      // 防止连续弹出多个message
      message.destroy();
      message.warning(data.message);
      if (data.code === -10000) {
        // window.location.href = '/';
      }
    } else {
    }
  } catch (e) {

  }
  return response;
});

export default request;

