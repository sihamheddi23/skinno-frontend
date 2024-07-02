import {useState} from 'react';
import { AgGridReact } from '@ag-grid-community/react';;
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ColDef, ColGroupDef, ValueGetterParams } from '@ag-grid-community/core';
import { useAppSelector } from '../../store';


const CustomButtonComponent = () => {
    return (
        <div className="flex gap-2 justify-center items-center">
            <button className="bg-violet-950 text-white p-2 rounded">Edit</button>
            <button className="bg-red-500 text-white p-2 rounded">Delete</button>
       </div>
    );
  };

const Table = () => {
   const themeState = useAppSelector((state) => state.theme)
    const [rowData, setRowData] = useState<any[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
]);
    const [columnDefs, setColumnDefs] = useState<(ColDef<any, any> | ColGroupDef<any>)[]>([
    { headerName: "Make & Model", valueGetter: (p: ValueGetterParams) => p.data.make + ' ' + p.data.model, flex: 2 },
    { field: "price", valueFormatter: p => '£' + Math.floor(p.value).toLocaleString(), flex: 1 },
    { field: "electric", flex: 1 },
    { field: "button", cellRenderer: CustomButtonComponent, flex: 1 }
]);
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