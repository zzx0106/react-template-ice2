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
 */
export const api_classes_classess = (params: IClassParams) => {
  return get<IClassProps.Data>('/data_operate/classes/classess', params);
};

export const api_classes_find_search_condition = (params: {
  term_id: number | undefined;
  search: string;
  tid: number | undefined;
}) => {
  return get<ISearchCondition.Data>('/data_operate/classes/find_search_condition', params);
};

export const api_classes_get_camp_terms = (params: { camp_id: number }) => {
  return get<ITerms.Data>('/data_operate/classes/get_camp_terms', params);
};

export const api_classes_find_visible_groups = (params: { tid: number }) => {
  return get<IGroups.Data>('/data_operate/classes/find_visible_groups', params);
};

export const api_classes_export_classess = (params: IClassExcelParams.Params) => {
  return get<IClassExcelParams.Data>('/data_operate/classes/export_classess', params, 'blob');
};

export const api_classes_transform_classess = (params: { term_id: number; tid: number; category: string }) => {
  return get('/data_operate/classes/transform_classess', params);
};

export const api_classes_set_transform_rate = (params: IRateSetting) => {
  return post('/data_operate/classes/set_transform_rate', params);
};
