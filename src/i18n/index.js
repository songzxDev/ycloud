const lang = {
  en: {
    '请选择': 'select',
    '确定': 'ok',
    '更多': 'more',
    '收起': 'collapse',
    '展开': 'open',
    '暂无数据': 'Can\'t find any result',
    '取消': 'cancel',
    '删除': 'delete',
    '提示': 'tip',
    '清空': 'clear',
    '校验失败！': 'validate error!',
    '上一页': 'prev',
    '下一页': 'next',
    '每页显示': 'show',
    '条': 'lists',
    '暂无匹配数据': 'Can\'t find any result',
    '详细': 'Details',
    '日': 'Sun',
    '一': 'Mon',
    '二': 'Tue',
    '三': 'Wed',
    '四': 'Thu',
    '五': 'Fri',
    '六': 'Sat',
    '年': '',
    '1月': 'Jan',
    '2月': 'Feb',
    '3月': 'Mar',
    '4月': 'Apr',
    '5月': 'May',
    '6月': 'Jun',
    '7月': 'Jul',
    '8月': 'Aug',
    '9月': 'Sep',
    '10月': 'Oct',
    '11月': 'Nov',
    '12月': 'Dec',
    '一月': 'Jan',
    '二月': 'Feb',
    '三月': 'Mar',
    '四月': 'Apr',
    '五月': 'May',
    '六月': 'Jun',
    '七月': 'Jul',
    '八月': 'Aug',
    '九月': 'Sep',
    '十月': 'Oct',
    '十一月': 'Nov',
    '十二月': 'Dec'
  }
}
var getlang = function (key) {
  if (document.cookie.indexOf('u_locale=en_US') >= 0) {
    return lang.en[key]
  } else {
    return key
  }
}
export default getlang
