module.exports = {
  fieldData: {
    discountActivitiesId: '活动标识',
    activitiesTitle: '活动名称',
    activitiesTitleAddHelper: '请合理填写，保存后不可更改',
    activitiesTitleUpdateHelper: '请合理填写，保存后不可更改',
    stockPrice: '活动站长价',
    stockPriceAddHelper: '活动专属站长价，请合理设置，保存后不可更改',
    stockPriceUpdateHelper: '活动专属站长价，不可更改',
    inviterRewardPrice: '推荐奖励金',
    inviterRewardPriceAddHelper: '活动专属推荐奖励金，请合理设置，保存后不可更改',
    inviterRewardPriceUpdateHelper: '活动专属推荐奖励金，不可更改',
    activitiesSalePrice: '活动售价',
    activitiesSalePriceAddHelper: '活动专属价格，请合理设置，保存后不可更改',
    activitiesSalePriceUpdateHelper: '活动专属价格，不可更改',
    goodsTitle: '商品名称',
    goodsTitleAddHelper: '点击按钮选择目标商品',
    goodsSpec: '商品名称',
    goodsType: '商品类型',
    businessId: '业务数据标识',
    saleStartTime: '开售时间',
    saleStartTimeAddHelper: '开始售卖的时间，需要设置整点，保存后不可更改',
    saleStartTimeUpdateHelper: '开始售卖的时间，不可更改',
    saleEndTime: '停售时间',
    saleEndTimeHelper: '停止售卖的时间，需要设置整点',
    activitiesStoreCount: '活动库存',
    activitiesStoreCountAddHelper: '初始活动库存值，如不确定，请填写0并在后续调整',
    activitiesStoreCountUpdateHelper: '点击调整库存按钮更改当前库存值',
    shareTitle: '分享标题',
    shareDescription: '分享描述',
    note: '备注',
    noteHelper: '填写您需要备注的信息，便于其他人协作工作',
    posterImageUrl: '海报图片地址',
    limitCustomerByCount: '用户限购数量',
    limitCustomerByCountAddHelper: '不限制购买请填写0，保存后不可更改',
    limitCustomerByCountUpdateHelper: '0为不限制购买，不可更改',
    limitMerchantByCount: '站长限购数量',
    limitMerchantByCountAddHelper: '不限制购买请填写0，保存后不可更改',
    limitMerchantByCountUpdateHelper: '0为不限制购买，不可更改',
    isCanRefund: '是否可退',
    isCanRefundAddHelper: '购买后可否退款，保存后不可更改',
    isCanRefundUpdateHelper: '购买后可否退款，不可更改',
    orderExpireMinute: '付款限时',
    orderExpireMinuteAddHelper: '付款超时分钟数，付款超时订单将关闭',
    orderExpireMinuteUpdateHelper: '付款超时分钟数，不可更改',
    titleAddHelper: '点击按钮选择需要抢购的商品',
    state: '活动状态',
    city: '所属地区',
    inTime: '添加时间',
    changeType: '变更模式',
    storeChangeCount: '变更数量',
  },
};

// * @param {activitiesTitle} 抢购活动名称 必填
// * @param {stockPrice} 站长价格 必填
// * @param {inviterRewardPrice} 站长推荐奖励金 必填
// * @param {activitiesSalePrice} 活动售价 必填
// * @param {goodsType} 商品类型 必填
// * @param {businessId} 业务数据标识 必填
// * @param {saleStartTime} 开售时间 必填
// * @param {saleEndTime} 停售时间 必填
// * @param {activitiesStoreCount} 初始库存 非必填 大于等于0 默认值0
// * @param {shareTitle} 分享标题 必填
// * @param {shareDescription} 分享描述 非必填
// * @param {note} 备注 必填
// * @param {posterImageUrl} 海报图片地址 非必填
// * @param {limitCustomerByCount} 用户限购数量 非必填 大于等于0 默认值0 0表示不限
// * @param {limitMerchantByCount} 站长限购数量 非必填 大于等于0 默认值0 0表示不限
// * @param {isCanRefund} 是否可退款 必填 0/1 默认值0 0表示不允许退款
// * @param {orderExpireMinute} 订单过期时间（分钟数） 必填
