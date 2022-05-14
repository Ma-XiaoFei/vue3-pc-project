import axios from '@/api';

export async function getFieldsUsingGET(params?: { [key: string]: any }) {
  return axios.get<any,API.ResultListProductSourcesVO_>('/rank/get-fields', {
    params
  });
}

/** 获取画图所依赖的数据-自然位 */
export async function getFigureNaturalUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFigureNaturalUsingGETParams
) {
  const { productId: param0, wordId: param1, ...queryParams } = params;
  return axios.get<any,API.ResultListCommentT_>(`/rank/get-figure-natural/${param0}/${param1}`, {
    params: { ...queryParams },
  });
}

/** 获取画图所依赖的数据-广告位 */
export async function getFigureAssiUsing(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFigureAdUsingGETParams
) {
  const { productId: param0, wordId: param1, ...queryParams } = params;
  return axios.get<any,API.ResultListCommentT_>(`/rank/get-figure-ad/${param0}/${param1}`, {
    params: { ...queryParams },
  });
}


/** 提交评论 POST /rank/submit-comment */
export async function submitCommentUsingPOST(
  body: API.CommentT_,
) {
  return axios.post<API.ResultBoolean_>('/rank/submit-comment', body);
}

