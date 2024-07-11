import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import Form from "../components/admin/Form";
import Input from "../components/admin/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCompanyInfo, updateCompanyInfo } from "../store/reducers/userSlice";
import { alertSuccess } from "../utils/toasts";
import SubmitButton from "../components/generics/SubmitButton";
import GeneralAdminUI from "../components/admin/GeneralAdminUI";

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
  const [logo_image, setlogo_image] = useState<File | undefined>(undefined)
  
  
  const formik = useFormik({
    initialValues: {
      email: userState.user.company?.email || "",
      name: userState.user.company?.name || "",
      phone: userState.user.company?.phone || "",
      address: userState.user.company?.address || "",
    },
    onSubmit: (values) => {
      const input: any = {
        ...values,
        logo: logo_image,
        token: userState.user.token,
      };

      if (userState.user.company) {
        input.id = userState.user.company.id;
        dispatch(updateCompanyInfo(input))
          .unwrap()
          .then(() => {
            alertSuccess("Company information has been added successfully");
          });
      } else {
        dispatch(addCompanyInfo(input))
          .unwrap()
          .then(() => {
            alertSuccess("Company information updated successfully");
          });
      }

    },
    validationSchema: companySchema,
  });
  return (
      <GeneralAdminUI>
        <Form title="Update Company Information" onSubmit={formik.handleSubmit}>
          <Input
            theme={themeState.theme}
            labelText="Company Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter your company name"
            id="name"
            errors={formik.errors.name}
          />

          <Input
            theme={themeState.theme}
            labelText="Company Email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter your company email"
            id="email"
            errors={formik.errors.email}
          />

          <Input
            theme={themeState.theme}
            labelText="Company Phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Enter your company phone"
            id="phone"
            errors={formik.errors.phone}
          />

          <Input
            theme={themeState.theme}
            labelText="Company Address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Enter your company address"
            id="address"
            errors={formik.errors.address}
          />

          <Input
            theme={themeState.theme}
            labelText="Company Logo"
            type="file"
            id="logo"
            onChange={(e) => {
              setlogo_image(e.target.files[0]);
            }}
            placeholder="Enter your company logo"
          />
          <SubmitButton name={userState.loadingCompany ? "Updating..." : "Update"} />

        </Form>
     </GeneralAdminUI>
  );
};

export default CompanyInfoPage;
