import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
import { sideNavBarPaths, SideNavBarPathsType } from '../../shared/router/sideNavBarPath';
import { iconFontUrl } from '../../shared/configurations';

const IconFont = createFromIconfontCN({
  scriptUrl: iconFontUrl,
});

const constructMenuItems = (paths: SideNavBarPathsType) => paths.map((path) =>
  <Menu.Item key={path.key} icon={<IconFont type={path.icon} className="side-bar-icon-font"/>}>
    {path.name}
  </Menu.Item>);

export const SideNavBar = React.memo(() => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { Sider } = Layout;

  const history = useHistory();

  return (
    <>
      <Sider trigger={null} collapsible collapsed={isCollapsed} className='side-nav-bar'>
        <div className="side-nav-bar__btn-container">
          <Button type="text" onClick={() => setIsCollapsed(!isCollapsed)}>
            <IconFont type="icon-Hamburger" className="side-nav-bar__btn__trigger--white" />
          </Button>
        </div>
        <div className="menu-container">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}
            onDeselect={(event) => event.selectedKeys.splice(0)}
            onSelect={(event) => {
              const path = sideNavBarPaths.find(item => item.key === event.key);
              if (path) {
                history.push(path.path);
              }
            }}
          >
            {constructMenuItems(sideNavBarPaths)}
          </Menu>
        </div>
      </Sider>
    </>
  );
});