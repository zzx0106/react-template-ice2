export declare namespace ISystemInfo {
  export interface Data {
    appid: string;
    agentid: string;
    redirect_uri: string;
    state: string;
  }

  export interface RootObject {
    code: number;
    msg: string;
    data: Data;
  }
}

export declare namespace IUserInfo {
  export interface Child2 {
    value: number;
    type: number;
    check: number;
    title: string;
    children: any[];
  }

  export interface Child {
    value: number;
    type: number;
    check: number;
    title: string;
    children: Child2[];
  }

  export interface MenuTree {
    value: number;
    type: number;
    check: number;
    title: string;
    children: Child[];
  }

  export interface Content {
    menu_tree: MenuTree[];
    name: string;
    avatar: string;
  }

  export interface Data {
    content: Content;
  }

  export interface RootObject {
    code: number;
    msg: string;
    data: Data;
  }
}
