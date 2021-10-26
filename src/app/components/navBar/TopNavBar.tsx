import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../shared/configurations';

const IconFont = createFromIconfontCN({
  scriptUrl: iconFontUrl,
});

type TopNavBarProps = {
  title: string
}

export const TopNavBar = React.memo<TopNavBarProps>(({ title }) => {
  const { Header } = Layout;

  return (
    <>
      <Header>
        <div className="title-container">
          <h3>{title}</h3>
        </div>
      </Header>
    </>
  );
});