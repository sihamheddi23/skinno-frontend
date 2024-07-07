import {useState} from 'react';
import { AgGridReact } from '@ag-grid-community/react';;
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ColDef, ColGroupDef } from '@ag-grid-community/core';
import { useAppSelector } from '../../store';

type TableProps = {
  rowData: Object[];
  columnDefs: any 
}

const Table: React.FC<TableProps> = ({ rowData, columnDefs}) => {
  const themeState = useAppSelector((state) => state.theme)
  
    
return (
  <div style={{ width: '100%', height: '500px' }}>
    <div
      style={{ width: '100%', height: '100%' }}
      className={themeState.theme === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark"}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  </div>
  );
};

export default Table