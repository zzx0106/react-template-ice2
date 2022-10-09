import { get, post } from '@/utils/http';
import { ITeamExportTerms, ITerms, IUpdateTerm } from './index.i';

/**
 * @description 营期列表
 */
export const api_term_terms = (params: { page: number; limit: number; camp_id: number }) => {
  return get<ITerms.Data>('/data_operate/term/terms', params);
};

export const api_term_export_terms = (params: ITeamExportTerms.Params) => {
  return get<ITeamExportTerms.Data>('/data_operate/term/export_terms', params, 'blob');
};

export const api_term_update_term = (params: IUpdateTerm) => {
  return post<any>('/data_operate/term/update_term', params);
};
