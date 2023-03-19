import { LearningServices } from '@/services';

// export default {
//   state: {
//     test: "Fiona"
//   },
//   reducers: {
//     update(state: any, { payload }: any) {
//       return {
//         ...state,
//         ...payload,
//       };
//     },

//   },
//   effects: {
//     *getCourseDetail({ payload }, { call, put, select }) {
//         const result = yield call(LearningServices.courseDetail, {...payload});
//         if (result) {
//           yield put({ type: 'update', payload: { course: result.data } });
//         }
//     },
//   },
// };

export default () => {
  const user = {
    username: 'umi',
  };
 
  return { user };
};
