/*
 * @Author: linzhihai
 * @Date: 2021-08-26 19:11:49
 * @LastEditTime: 2021-10-21 17:14:36
 * @Description:
 */
import { useState, useEffect, useContext } from 'react';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import Logo from '../Logo';
import logoImage from '@/assets/images/logo.png';
import { ThemeContext } from '../..';
import HeaderMenu from '../Menu/HeaderMenu';
import SiderMenu from '../Menu/SiderMenu';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { RootDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { getSearchParams } from 'ice';
import { urlConcatParams } from '@/utils/tools';
import styles from './index.module.scss';
import { CSSModule } from '@/utils/css-module';

type SiderTheme = 'light' | 'dark';

const { Header, Content, Footer, Sider } = Layout;

const PageNav = ({ children }: { children: React.ReactNode }) => {
  const theme = useContext(ThemeContext) as SiderTheme;
  const dispatch = useDispatch<RootDispatch>();
  const userState = useSelector((state: RootState) => state.user);
  const routeState = useSelector((state: RootState) => state.route);
  const [showSettingIcon, setShowSettingIcon] = useState(false);
  const history = useHistory();
  const route = useLocation();
  const searchParams = getSearchParams();

  useEffect(() => {
    if (route.pathname.indexOf('home') === -1 && routeState.canVisitedRouteName.includes('设置')) {
      setShowSettingIcon(true);
    }
  }, [route.pathname, routeState]);

  const onMenuClick = (event: MenuInfo) => {
    if (event.key === 'logout') {
      // userDispatch.logout();
      dispatch.user.logout();
    }
  };

  const DropdownMenu = (
    <Menu style={{ marginTop: 12 }} onClick={onMenuClick}>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        theme={theme}
        styleName="layout-sider"
      >
        <Logo
          {...{
            image: logoImage,
            text: '梨花效能平台',
            url: '/home/team-card',
          }}
        />
        <SiderMenu />
      </Sider>
      <Layout styleName="site-layout" style={{ marginLeft: 200 }}>
        <Header styleName="site-layout-background layout-header">
          <HeaderMenu />
          <div styleName="header-right-container">
            {showSettingIcon && (
              <SettingOutlined
                style={{
                  marginRight: 16,
                  color: '#fff',
                  fontSize: 16,
                }}
                onClick={() =>
                  history.push(
                    urlConcatParams('/my-team/setting/team-info', {
                      id: searchParams.id,
                      camp_id: searchParams.camp_id,
                    }),
                  )
                }
              />
            )}
            <Dropdown overlay={DropdownMenu}>
              <Avatar styleName="header-avatar" size="small">
                {userState.name.substring(0, 1)}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>梨花效能平台 © 2021</Footer>
      </Layout>
    </Layout>
  );
};

export default CSSModule(PageNav, styles);
