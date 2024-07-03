import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAppSelector } from "../store";
import Form from "../components/admin/Form";
import Input from "../components/admin/Input";

const CompanyInfoPage = () => {
  const themeState = useAppSelector((state) => state.theme);

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={
          themeState.theme === "light"
            ? "flex flex-col flex-grow bg-slate-100"
            : "flex flex-col flex-grow text-white bg-gray-800"
        }
      >
        <Header />
        <Form title="Update Company Information" onSubmit={() => { }}>
          <Input theme={themeState.theme} labelText="Company Name"
            type="text" value="Company Name" onChange={() => { }} placeholder=""
            id="companyName" errors="" />
          
          <Input theme={themeState.theme} labelText="Company Email"
            type="text" value="Company Email" onChange={() => { }} placeholder=""
            id="companyEmail" errors="" />
          
          <Input theme={themeState.theme} labelText="Company Phone"
            type="text" value="Company Phone" onChange={() => { }} placeholder=""
            id="companyPhone" errors="" />
          
          <Input theme={themeState.theme} labelText="Company Address"
            type="text" value="Company Address" onChange={() => { }} placeholder=""
            id="companyAddress" errors="" />
           
          <Input theme={themeState.theme} labelText="Company Logo"
            type="file"  onChange={() => { }} placeholder=""
            id="companyLogo" errors="" />
        </Form>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
