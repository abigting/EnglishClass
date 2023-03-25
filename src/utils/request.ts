import { extend } from 'umi-request';
import { message } from 'antd';
// import { getCookie } from './common';

const request = extend({});

request.interceptors.request.use((_url, options: any) => {
  const { headers, ...rest } = options;
  return {
    options: {
      ...rest,
      headers: {
        // userUUId: Cookies.get("userUUId") || "24371d0b490940679de3e376a195a86b",
        userUUId: window.localStorage.getItem("EnglishClass_userUUId"),
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
      if (data.code === 6666) {
        // window.location.href = '/';
      }
    } else {
    }
  } catch (e) {

  }
  return response;
});

export default request;

