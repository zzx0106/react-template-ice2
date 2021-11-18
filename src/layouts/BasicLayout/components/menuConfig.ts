/*
 * @Author: linzhihai
 * @Date: 2021-08-26 19:11:49
 * @LastEditTime: 2021-10-28 11:07:34
 * @Description:
 */
export interface IRouteContent {
  title: string;
  name: string;
  path: string;
  iconName?: string;
  children?: IRouteContent[];
}

const headerOperatingMenu: IRouteContent[] = [
  {
    title: '运营',
    name: 'operation',
    path: '/operation/workbench/todo-list',
    iconName: 'HddFilled',
  },
  // {
  //   title: '运营',
  //   name: 'operation',
  //   path: '/operation/workbench/sop-template',
  //   iconName: 'DashboardFilled',
  // },
  {
    title: '数据',
    name: 'data-analysis',
    path: '/data-analysis/data-summary',
    iconName: 'LineChartOutlined',
  },
];

/**
 * @description: 基础模块路由
 */
const asideMenus: IRouteContent[] = [
  // 团队模块
  {
    title: '我的团队',
    name: 'team-card',
    path: '/home/team-card',
    iconName: 'TeamOutline',
    children: [],
  },
  // 管理模块
  {
    title: '权限管理',
    name: 'auth-manage',
    path: '/home/auth-manage',
    iconName: 'SolutionOutlined',
    children: [],
  },
  {
    title: '人员管理',
    name: 'person-manage',
    path: '/home/person-manage',
    iconName: 'UserOutlined',
    children: [],
  },
  // 日志模块
  // {
  //   title: '操作日志',
  //   name: 'operation-logs',
  //   path: '/home/operation-logs',
  //   iconName: 'FileOutlined',
  //   children: [],
  // },
];

/**
 * @description: 团队设置模块路由
 */
const myTeamMenus: IRouteContent[] = [
  {
    title: '团队资料',
    name: 'team-info',
    path: '/my-team/setting/team-info',
    iconName: 'FileZipOutlined',
    children: [],
  },
  {
    title: '小组管理',
    name: 'group-manage',
    path: '/my-team/setting/group-manage',
    iconName: 'ApartmentOutlined',
    children: [],
  },
  {
    title: '成员管理',
    name: 'member-manage',
    path: '/my-team/setting/member-manage',
    iconName: 'UserSwitchOutlined',
    children: [],
  },
];

/**
 * @description: 运营模块路由
 */
const operationMenus: IRouteContent[] = [
  // TODO: 下版本开放
  // {
  //   title: '工作台',
  //   name: 'operation',
  //   path: '/operation/workbench',
  //   children: [
  //     {
  //       title: '待办工作',
  //       name: 'todo-list',
  //       path: '/operation/workbench/todo-list',
  //       iconName: 'FileZipOutlined',
  //     },
  //     {
  //       title: '工作台统计',
  //       name: 'workbench-count',
  //       path: '/operation/workbench/count',
  //       iconName: 'TableOutlined',
  //     },
  //     {
  //       title: '工作台设置',
  //       name: 'workbench-setting',
  //       path: '/operation/workbench/setting',
  //       iconName: 'SettingOutlined',
  //     },
  //   ],
  // },
  // TODO: 下版本功能
  // {
  //   title: 'SOP 运营',
  //   name: 'sop',
  //   path: '/operation/sop',
  //   children: [
  //     {
  //       title: 'SOP 模板',
  //       name: 'sop-template',
  //       path: '/operation/sop/sop-template',
  //       iconName: 'FileTextOutlined',
  //     },
  //     {
  //       title: '执行统计',
  //       name: 'execute-count',
  //       path: '/operation/sop/execute-count',
  //       iconName: 'InsertRowAboveOutlined',
  //     },
  //   ],
  // },
  {
    title: '学员运营',
    name: 'student-operating',
    path: '/operation/student-operating',
    children: [
      {
        title: '学员管理',
        name: 'student-manage',
        path: '/operation/student-operating/student-manage',
        iconName: 'TeamOutlined',
      },
      {
        title: '高意向学员',
        name: 'high-intention',
        path: '/operation/student-operating/high-intention',
        iconName: 'SmileOutlined',
      },
      {
        title: '高潜力学员',
        name: 'high-potential',
        path: '/operation/student-operating/high-potential',
        iconName: 'RiseOutlined',
      },
      {
        title: '已购课学员',
        name: 'has-bought',
        path: '/operation/student-operating/has-bought',
        iconName: 'DollarOutlined',
      },
    ],
  },
  {
    title: '大班双师',
    name: 'master',
    path: '/operation/master',
    children: [
      {
        title: '营期管理',
        name: 'camp-manage',
        path: '/operation/master/camp-manage',
        iconName: 'CalendarOutlined',
      },
      {
        title: '班级管理',
        name: 'class-manage',
        path: '/operation/master/class-manage',
        iconName: 'ApartmentOutlined',
      },
      // TODO: 暂时不开放
      // {
      //   title: '高价课管理',
      //   name: 'course-manage',
      //   path: '/operation/master/course-manage',
      //   iconName: 'MoneyCollectOutlined',
      // },
      {
        title: '大班双师设置',
        name: 'course-setting',
        path: '/operation/master/course-setting',
        iconName: 'SettingOutlined',
      },
    ],
  },
];

/**
 * @description: 数据模块路由
 */
const dataAnalysisMenus: IRouteContent[] = [
  {
    title: '数据概览',
    name: 'data-summary',
    path: '/data-analysis/data-summary',
    iconName: 'ApartmentOutlined',
    children: [],
  },
  {
    title: '渠道数据',
    name: 'channel-data',
    path: '/data-analysis/channel-data',
    iconName: 'ApartmentOutlined',
    children: [],
  },
  {
    title: '班组数据',
    name: 'class-data',
    path: '/data-analysis/class-data',
    iconName: 'ApartmentOutlined',
    children: [],
  },
  {
    title: '班级数据',
    name: 'monitor-data',
    path: '/data-analysis/monitor-data',
    iconName: 'ApartmentOutlined',
    children: [],
  },
  {
    title: '学员画像',
    name: 'profile-analysis',
    path: '/data-analysis/profile-analysis',
    iconName: 'ApartmentOutlined',
    children: [],
  },
];

export { asideMenus, myTeamMenus, headerOperatingMenu, operationMenus, dataAnalysisMenus };
