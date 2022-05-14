declare namespace API {
  type CommentT_ = {
    cby?: number;
    commentId?: number;
    /** 评论内容 */
    content?: string;
    ctime?: string;
    /** 对应点id,等同于pointId */
    sourceId?: number;
    /** 对应点类型,等同于pointType */
    sourceType?: string;
    uby?: number;
    /** 评论人id，固定值6 */
    userId?: number;
    utime?: string;
    utraceId?: string;
  };

  type CommentT_1 = {
    /** 评论集合 */
    comments?: CommentVO_[];
    /** 日期，横坐标 */
    date?: string;
    /** 对应点id */
    pointId?: number;
    /** 对应点名称，natural是自然位，advert是广告位 */
    pointType?: string;
    /** 每个点对应数据，2，10，1 表示， 第2页，第10行，第1列 */
    rank?: string;
    /** 数据量，纵坐标 */
    rankNum?: number;
  };

  type CommentVO_ = {
    /** 评论内容 */
    content?: string;
    /** 对应点id,等同于pointId */
    sourceId?: number;
    /** 评论人姓名 */
    userName?: string;
  };

  type ProductSourcesContentVO_ = {
    /** 商品名称 */
    asin: string;
    /** 商品源id */
    productId: number;
    /** 关键词 */
    searchWords: WordT_[];
  };

  type ProductSourcesVO_ = {
    /** 内容 */
    content?: ProductSourcesContentVO_[];
    /** 商品源名称 */
    sourceName?: string;
  };

  type ResultListCommentT_ = {
    /** 返回数据 */
    data?: CommentT_1[];
    /** 返回信息 */
    msg?: string;
    /** 返回码 */
    statusCode?: number;
    /** 请求时间戳 */
    timestamp?: number;
  };

  type ResultListProductSourcesVO_ = {
    /** 返回数据 */
    data?: ProductSourcesVO_[];
    /** 返回信息 */
    msg?: string;
    /** 返回码 */
    statusCode?: number;
    /** 请求时间戳 */
    timestamp?: number;
  };

  type ResultBoolean_ = {
    /** 返回数据 */
    data?: boolean;
    /** 返回信息 */
    msg?: string;
    /** 返回码 */
    statusCode?: number;
    /** 请求时间戳 */
    timestamp?: number;
  };

  type WordT_ = {
    cby?: number;
    ctime?: string;
    productId?: number;
    uby?: number;
    utime?: string;
    utraceId?: string;
    /** 关键词 */
    word?: string;
    /** 关键词id */
    wordId?: number;
  };

  type getFigureAdUsingGETParams = {
    /** 产品id */
    productId: string|undefined;
    /** 关键词id */
    wordId: string|undefined;
  };

  type getFigureNaturalUsingGETParams = {
    /** 产品id */
    productId: string|undefined;
    /** 关键词id */
    wordId: string|undefined;
  };
}
