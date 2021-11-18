/*
 * @Author: linzhihai
 * @Date: 2021-09-24 14:44:08
 * @LastEditTime: 2021-09-30 16:23:02
 * @Description:
 */
import { get, post } from '@/utils/http';
import { ITeamExportTerms, ITerms, IUpdateTerm } from './index.i';

/**
 * @description 营期列表
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#营期列表
 */
export const api_term_terms = (params: { page: number; limit: number; camp_id: number }) => {
  return get<ITerms.Data>('/data_operate/term/terms', params);
};

/**
 * @description 导出营期
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#导出营期
 */
export const api_term_export_terms = (params: ITeamExportTerms.Params) => {
  return get<ITeamExportTerms.Data>('/data_operate/term/export_terms', params, 'blob');
};

/**
 * @description 编辑营期
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#编辑营期
 */
export const api_term_update_term = (params: IUpdateTerm) => {
  return post<any>('/data_operate/term/update_term', params);
};
