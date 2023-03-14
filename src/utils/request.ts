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
        ...headers,
      },
    },
  };
});

request.interceptors.response.use(async (response) => {
  try {
    const data = await response.clone().json();
    if (data.code !== '0') {
      // 防止连续弹出多个message
      message.destroy();
      message.warning(data.errorMsg);
      if (data.code === '401') {
        window.location.href = '/login';
      }
    } else {
    }
  } catch (e) {

  }
  return response;
});

export default request;

