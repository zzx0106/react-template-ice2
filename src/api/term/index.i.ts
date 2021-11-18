/*
 * @Author: linzhihai
 * @Date: 2021-09-24 14:44:13
 * @LastEditTime: 2021-09-30 16:12:49
 * @Description:
 */

export declare namespace ITerms {
  export interface Content {
    id: number;
    rank: number;
    start_time: Date;
    end_time: Date;
    camp_day1: string;
    camp_day2: string;
    camp_day3: string;
    camp_day4: string;
    camp_day5: string;
  }

  export interface Data {
    content: Content[];
    count: number;
  }

  export interface RootObject {
    code: number;
    msg: string;
    data: Data;
  }
}
export declare namespace ITeamExportTerms {
  export interface Params {
    camp_id: number;
  }
  export interface Data {
    data: BlobPart & { type: string };
  }
}
export interface IUpdateTerm {
  id: number;
  camp_day1?: string;
  camp_day2?: string;
  camp_day3?: string;
  camp_day4?: string;
  camp_day5?: string;
}
