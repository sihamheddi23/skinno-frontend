import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAppDispatch, useAppSelector } from "../store";
import Form from "../components/admin/Form";
import Input from "../components/admin/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCompanyInfo, updateCompanyInfo } from "../store/reducers/userSlice";
import { alertSuccess } from "../utils/toasts";

const companySchema = Yup.object().shape({
  name: Yup.string().required("Above field is required"),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .required()
    .matches(/^\+\d{9}$/, "Must be only 9 digits and start with +"),
  address: Yup.string().required(),
});

const CompanyInfoPage = () => {
  const themeState = useAppSelector((state) => state.theme);
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: userState.user.company.email || "",
      name: userState.user.company.name || "",
      phone: userState.user.company.phone || "",
      address: userState.user.company.address || "",
      logo: null,
    },
    onSubmit: (values) => {
      const input: any = {
        ...values,
        token: userState.user.token,
      };
      if (userState.user.company) {
        input.id = userState.user.company.id;
        dispatch(updateCompanyInfo(input))
          .unwrap()
          .then(() => {
            alertSuccess("Company information has been added successfully");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      } else {
        dispatch(addCompanyInfo(input))
          .unwrap()
          .then(() => {
            alertSuccess("Company information updated successfully");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      }
    },
    validationSchema: companySchema,
  });
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
        <Form title="Update Company Information" onSubmit={() => {}}>
          <Input
            theme={themeState.theme}
            labelText="Company Name"
            type="text"
            value="Company Name"
            onChange={() => {}}
            placeholder=""
            id="name"
            errors=""
          />

          <Input
            theme={themeState.theme}
            labelText="Company Email"
            type="text"
            value="Company Email"
            onChange={() => {}}
            placeholder=""
            id="email"
            errors=""
          />

          <Input
            theme={themeState.theme}
            labelText="Company Phone"
            type="text"
            value="Company Phone"
            onChange={() => {}}
            placeholder=""
            id="phone"
            errors=""
          />

          <Input
            theme={themeState.theme}
            labelText="Company Address"
            type="text"
            value="Company Address"
            onChange={() => {}}
            placeholder=""
            id="address"
            errors=""
          />

          <Input
            theme={themeState.theme}
            labelText="Company Logo"
            type="file"
            onChange={() => {}}
            placeholder=""
            id="logo"
            errors=""
          />
        </Form>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
