export declare namespace IClassProps {
  export interface Content {
    push_sub_category: string;
    id: number;
    create_time: string;
    monitor_name: string;
    is_statistics: number;
    class_name: string;
    push_category: string;
    transform_rate: number;
    robot: string;
    chatroom: string;
    high_course_id: number;
    high_course_name: string;
    high_course_price: number;
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

export declare namespace ISearchCondition {
  export interface Category {
    push_sub_category: string;
    push_category: string;
  }

  export interface Data {
    category: Category[];
  }

  export interface RootObject {
    code: number;
    msg: string;
    data: Data;
  }
}

export declare namespace IGroups {
  export interface Content {
    check?: number;
    id: number;
    name: string;
  }

  export interface Data {
    content: Content[];
  }

  export interface RootObject {
    code: number;
    msg: string;
    data: Data;
  }
}

export declare namespace ITerms {
  export interface Content {
    id: number;
    rank: number;
    current: number;
    camp_day1: Date;
    camp_day5: Date;
  }

  export interface Data {
    content: Content[];
  }

  export interface RootObject {
    code: number;
    msg: string;
    data: Data;
  }
}

export interface IClassParams {
  tid: number;
  page: number | undefined;
  limit: number | undefined;
  camp_id: number | string | undefined;
  term_id: number | string | undefined;
  gid?: number | string | undefined;
  category?: string;
  auth_num_start?: number | string;
  auth_num_finish?: number | string;
  is_statistics?: number;
}
export declare namespace IClassExcelParams {
  export interface Params {
    camp_id: number;
    term_id: number;
    gid?: number;
    category?: string;
    auth_num_start?: number;
    auth_num_finish?: number;
    is_statistics?: number;
  }
  export interface Data {
    data: BlobPart & { type: string };
  }
}
export interface IRateSetting {
  term_id: number;
  class_data: Array<{ class_id: number; transform_rate: number }>;
}
