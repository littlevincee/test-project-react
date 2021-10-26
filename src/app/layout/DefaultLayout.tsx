import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Routes } from '../shared/router/routes';
import { SideNavBar } from '../components/navBar/SideNavBar';
import { TopNavBar } from '../components/navBar/TopNavBar';

export const DefaultLayout = () => {
  const { Content } = Layout;
  return (
    <div >
      <Layout className="layout-container">
        <TopNavBar title="Test App"/>
        <Layout>
          <SideNavBar />
          <Layout  className="layout">
            <Content className="content">
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};