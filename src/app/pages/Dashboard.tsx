import React, { useState, useEffect } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../shared/configurations';
import { ResultTable } from '../components/table/ResultTable';

export const Dashboard = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {

  }, []);

  return (
    <div className="dashboard-page-container">
      <ResultTable />
    </div>
  );
};