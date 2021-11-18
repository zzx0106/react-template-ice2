/*
 * @Author: linzhihai
 * @Date: 2021-09-08 11:20:23
 * @LastEditTime: 2021-10-18 14:44:33
 * @Description:
 */
import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { getSearchParams, useHistory, useLocation } from 'ice';
import { MenuInfo } from 'rc-menu/lib/interface';
import { HeaderMenuIconsMap } from '../menuIcons';
import { urlConcatParams } from '@/utils/tools';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

type MenuList = 'home' | 'my-team' | 'operation' | 'data-analysis';

const firstPathList: MenuList[] = ['home', 'my-team', 'operation', 'data-analysis'];

const HeaderMenu: React.FC = () => {
  const history = useHistory();
  const route = useLocation();
  const searchParams = getSearchParams();
  const [headerMenuName, setHeaderMenuName] = useState<MenuList>('home');
  const [selectedKeys, setSelectedKeys] = useState<string[]>();
  const routeState = useSelector((state: RootState) => state.route);

  const routeObj = {
    home: [],
    'my-team': routeState.headerOperatingMenu,
    operation: routeState.headerOperatingMenu,
    'data-analysis': routeState.headerOperatingMenu,
  };

  const linkToRoute = (e: MenuInfo) => {
    let path;
    // 获取第一个有访问权限的路由
    switch (e.key) {
      case 'operation':
        path = routeState.operationMenus[0]?.children?.[0].path;
        break;
      case 'data-analysis':
        path = routeState.dataAnalysisMenus[0].path;
        break;
      default:
        break;
    }

    if (path) {
      const jumpURL = urlConcatParams(path, {
        id: searchParams.id,
        camp_id: searchParams.camp_id,
      });
      history.push(jumpURL);
    }
  };

  useEffect(() => {
    replaceRoute();
  }, [route.pathname, routeState]);

  const replaceRoute = () => {
    let reg;

    // 以第一级路由名称为校准条件
    for (let i = 0, len = firstPathList.length; i < len; i++) {
      reg = RegExp(`^/${firstPathList[i]}/.*`);

      if (reg.test(route.pathname)) {
        // 动态设置该展示哪个路由
        setHeaderMenuName(firstPathList[i]);
        // 顶部导航栏使用一级路由name当作key
        setSelectedKeys([firstPathList[i]]);
        return;
      }
    }

    setHeaderMenuName('home');
  };

  return headerMenuName ? (
    <Menu
      onClick={linkToRoute}
      theme="dark"
      mode="horizontal"
      selectedKeys={selectedKeys}
      style={{ height: 48, lineHeight: '48px' }}
    >
      {routeObj[headerMenuName].map((item) => {
        return (
          <Menu.Item key={item.name} icon={HeaderMenuIconsMap.get(item.iconName as string)}>
            {item.title}
          </Menu.Item>
        );
      })}
    </Menu>
  ) : null;
};

export default HeaderMenu;
