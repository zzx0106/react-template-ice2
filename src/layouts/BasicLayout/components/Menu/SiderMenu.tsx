import { Menu } from 'antd';
import { getSearchParams, useHistory, useLocation } from 'ice';
import { asideMenus, myTeamMenus, operationMenus, dataAnalysisMenus, IRouteContent } from '../menuConfig';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { MenuIconsMap } from '../menuIcons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { urlConcatParams } from '@/utils/tools';
import { clearPending } from '@/utils/http/cancelRequest';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

interface RouteParams {
  children: any[];
  path: string;
  title: string | null;
  iconName?: string;
}

type MenuList = 'home' | 'my-team' | 'operation' | 'data-analysis';

const { SubMenu } = Menu;
const firstPathList: MenuList[] = ['home', 'my-team', 'operation', 'data-analysis'];

const SiderMenu = React.memo(() => {
  const history = useHistory();
  const route = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [menuName, setMenuName] = useState<MenuList>('home');
  const searchParams = getSearchParams();
  const routeState = useSelector((state: RootState) => state.route);

  const menuConfig = {
    home: routeState.asideMenus,
    'my-team': routeState.myTeamMenus,
    operation: routeState.operationMenus,
    'data-analysis': routeState.dataAnalysisMenus,
  };

  useEffect(() => {
    replaceRoute();
  }, [route.pathname, routeState]);

  /**
   * @description: 动态修改路由
   * @param {*}
   * @return {*}
   */
  const replaceRoute = () => {
    let reg;

    setSelectedKeys([route.pathname]);
    // 以第一级路由名称为校准条件
    for (let i = 0, len = firstPathList.length; i < len; i++) {
      reg = RegExp(`^/${firstPathList[i]}/.*`);

      if (reg.test(route.pathname)) {
        setOpenKeys([...menuConfig[firstPathList[i]].map((item: IRouteContent) => item.path)]);
        setMenuName(firstPathList[i] as MenuList);
        return;
      }
    }
  };

  /**
   * @description: 路由跳转
   * @param {any} e
   * @return {*}
   */
  const handleLinkTo = (e: MenuInfo) => {
    setSelectedKeys(e.keyPath);
    const jumpURL = urlConcatParams(
      e.key,
      JSON.stringify(searchParams) !== '{}'
        ? {
            id: searchParams.id,
            camp_id: searchParams.camp_id,
          }
        : {},
    );
    clearPending();

    history.push(jumpURL);
  };

  return (
    <Menu
      expandIcon={() => null}
      openKeys={openKeys}
      motion={{
        // 解决因收缩动画引起的卡顿问题
        motionLeaveImmediately: true,
      }}
      mode="inline"
      selectedKeys={selectedKeys}
      onClick={handleLinkTo}
    >
      {menuConfig[menuName].map((item: IRouteContent) => {
        return item.children && item?.children?.length > 0 ? (
          <SubMenu key={item.path} title={item.title} icon={item.iconName ? MenuIconsMap.get(item.iconName) : null}>
            {item.children.map((child) => (
              <Menu.Item key={child.path} icon={child.iconName ? MenuIconsMap.get(child.iconName) : null}>
                {child.title}
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.path}>{item.title}</Menu.Item>
        );
      })}
    </Menu>
  );
});

export default SiderMenu;
