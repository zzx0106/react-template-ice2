/*
 * @Author: linzhihai
 * @Date: 2021-09-26 11:28:55
 * @LastEditTime: 2021-10-27 17:40:46
 * @Description:
 */
import { get, post, url } from '@/utils/http';
import {
  IClassExcelParams,
  IClassParams,
  IClassProps,
  IGroups,
  IRateSetting,
  ISearchCondition,
  ITerms,
} from './index.i';

/**
 * @description 班级列表
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#班级列表
 */
export const api_classes_classess = (params: IClassParams) => {
  return get<IClassProps.Data>('/data_operate/classes/classess', params);
};

/**
 * @description 获取分组筛选条件
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#获取分组筛选条件
 */
export const api_classes_find_search_condition = (params: {
  term_id: number | undefined;
  search: string;
  tid: number | undefined;
}) => {
  return get<ISearchCondition.Data>('/data_operate/classes/find_search_condition', params);
};

/**
 * @description 获取营期-6
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#获取营期-6
 */
export const api_classes_get_camp_terms = (params: { camp_id: number }) => {
  return get<ITerms.Data>('/data_operate/classes/get_camp_terms', params);
};

/**
 * @description 获取小组信息-6
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#获取小组信息-6
 */
export const api_classes_find_visible_groups = (params: { tid: number }) => {
  return get<IGroups.Data>('/data_operate/classes/find_visible_groups', params);
};

/**
 * @description 导出班级列表
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#导出班级列表
 */
export const api_classes_export_classess = (params: IClassExcelParams.Params) => {
  return get<IClassExcelParams.Data>('/data_operate/classes/export_classess', params, 'blob');
};

/**
 * @description 获取班级列表
 */
export const api_classes_transform_classess = (params: { term_id: number; tid: number; category: string }) => {
  return get('/data_operate/classes/transform_classess', params);
};

/**
 * @description 设置班级转化率
 */
export const api_classes_set_transform_rate = (params: IRateSetting) => {
  return post('/data_operate/classes/set_transform_rate', params);
};
