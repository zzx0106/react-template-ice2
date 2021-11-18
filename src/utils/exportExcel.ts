/*
 * @Author: linzhihai
 * @Date: 2021-09-26 17:42:43
 * @LastEditTime: 2021-10-08 11:04:13
 * @Description:
 */

import { api_classes_export_classess } from '@/api/classes';
import { api_term_export_terms } from '@/api/term';
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import moment from 'moment';

const apiNameObject = {
  api_classes_export_classess,
  api_term_export_terms,
};
export type ApiName = keyof typeof apiNameObject;

/**
 * @description: 导出Excel
 * @param {string} apiName 已经在api文件中注册的方法名
 * @param {any} params 要传递的参数
 * @param {string} fileName 自定义文件名
 * @return {*}
 */
export function exportExcel(apiName: ApiName, params?: any, fileName?: string) {
  if (apiName in apiNameObject) {
    apiNameObject[apiName](params)
      .then((res) => {
        const blob = new Blob([res.data], { type: res.data.type });
        const url = window.URL.createObjectURL(blob);
        const element = document.createElement('a');
        document.body.appendChild(element);
        element.href = url;
        element.download = `${fileName || '数据'} ${moment().format('YYYY-MM-DD HH_mm_ss')}.xls`;
        element.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        message.error('请求异常，请稍后重试~');
        throw err;
      });
  } else {
    throw new Error(`找不到方法名${apiName}，你是否已经注册或引入该方法？`);
  }
}
