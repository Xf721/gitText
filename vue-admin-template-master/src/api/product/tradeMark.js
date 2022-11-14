import request from '@/utils/request'
export const getTradeMarkList=(page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });