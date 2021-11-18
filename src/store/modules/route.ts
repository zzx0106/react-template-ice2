import {
  asideMenus,
  headerOperatingMenu,
  dataAnalysisMenus,
  operationMenus,
  myTeamMenus,
  IRouteContent,
} from '@/layouts/BasicLayout/components/menuConfig';
import { api_index_homepage_init } from '@/api/index';
import { IUserInfo } from '@/api/index/index.i';
import { createModel } from '@rematch/core';
import type { RootModel } from '.';

interface IState {
  asideMenus: IRouteContent[];
  headerOperatingMenu: IRouteContent[];
  dataAnalysisMenus: IRouteContent[];
  operationMenus: IRouteContent[];
  myTeamMenus: IRouteContent[];
  canVisitedRouteName: string[];
}

export const route = createModel<RootModel>()({
  state: {
    asideMenus: [],
    headerOperatingMenu: [],
    dataAnalysisMenus: [],
    operationMenus: [],
    myTeamMenus: [],
    canVisitedRouteName: [],
  } as IState,

  reducers: {
    updateRoute(prevState, payload: any) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  effects: (dispatch) => ({
    async formatRoute(payload: IUserInfo.MenuTree[]) {
      const titleList: string[] = [];
      // 取出所有有权限的路由名称
      searchAndFormat(payload, titleList);
      dispatch.route.generateRoute(titleList);
      dispatch.route.updateRoute({ canVisitedRouteName: titleList });

      function searchAndFormat(routeList: IUserInfo.MenuTree[], titleList: string[]) {
        routeList = routeList.filter((item: any) => item.check === 0);

        if (routeList.length > 0) {
          routeList.forEach((item) => {
            titleList.push(item.title);

            if (item?.children?.length > 0) {
              searchAndFormat(item.children, titleList);
            }
          });
        }

        return routeList;
      }
    },
    async generateRoute(payload: string[]) {
      const routes = await Promise.all([
        getRoutes(asideMenus),
        getRoutes(headerOperatingMenu),
        getRoutes(dataAnalysisMenus),
        getRoutes(operationMenus),
        getRoutes(myTeamMenus),
      ]);

      function getRoutes(routeList: IRouteContent[]) {
        return new Promise((resolve) => {
          for (let index = 0; index < routeList.length; index++) {
            const element = routeList[index];
            // 根据有权限的路由名称筛选路由表
            if (!payload.includes(element.title)) {
              routeList.splice(index, 1);
              index--;
            }

            if (element.children && element.children.length) {
              getRoutes(element.children);
            }
          }

          resolve(routeList);
        });
      }

      dispatch.route.updateRoute({
        asideMenus: routes[0],
        headerOperatingMenu: routes[1],
        dataAnalysisMenus: routes[2],
        operationMenus: routes[3],
        myTeamMenus: routes[4],
      });
    },
  }),
});
