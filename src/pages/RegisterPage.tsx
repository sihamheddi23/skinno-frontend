import Input from "../components/generics/Input";
import SubmitButton from "../components/generics/SubmitButton";
import AuthForm from "../components/forms/AuthForm";
import RadioButton from "../components/generics/RadioButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import { axiosConfig } from "../api/axiosConfig";
import { alertError, alertSuccess } from "../utils/toasts";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3),
  lastName: Yup.string().required().min(3),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .required()
    .matches(/^\+\d{9}$/, "Must be only 9 digits and start with +"),
  password: Yup.string().required().min(8),
  role: Yup.string().required().oneOf(["admin", "customer"]),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      role: "",
    },
    onSubmit: (values) => {
      console.log("values ", values);
      
      axiosConfig
        .post("/api/v1/auth/register", values)
        .then(() => {
          alertSuccess("you have been registered successfully");
          setTimeout(() => {
            // redirect to login page
            navigate("/login");
          }, 2000);
        })
        .catch((err) => {
          if (err.response.status === 401 || err.response.status === 400) {
            alertError(err.response.data.error);
          }
          if (err.response.status === 500) {
            alertError("Something went wrong please try again later");
          }
          console.log(err.response);
        });
    },
    validationSchema: SignupSchema,
  });
  return (
    <div>
      <AuthForm type="Register" onSubmit={formik.handleSubmit}>
        <Input
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          labelText=" First name"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          errors={formik.errors.firstName}
        />
        <Input
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          labelText="Last name"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          errors={formik.errors.lastName}
        />
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          labelText="Email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          errors={formik.errors.email}
        />
        <Input
          name="phone"
          type="text"
          placeholder="+countryCode then your phone number"
          labelText="Phone Number"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          errors={formik.errors.phone}
        />
        <Input
          name="username"
          type="text"
          placeholder="Enter your username"
          labelText="Username"
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          errors={formik.errors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          labelText="Password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          errors={formik.errors.password}
        />
        <div className="flex gap-2">
          <h5>Choose your role : </h5>
          <RadioButton
            name="role"
            value="admin"
            optionName="Admin"
            onChange={formik.handleChange}
            checked={formik.values.role === "admin"}
          />
          <RadioButton
            name="role"
            value="customer"
            optionName="Customer"
            onChange={formik.handleChange}
            checked={formik.values.role === "customer"}
          />
        </div>
        {formik.errors.role && (
          <p className="text-red-500 mt-2 mb-4">{formik.errors.role}</p>
        )}
        <SubmitButton name="Register" />
      </AuthForm>
    </div>
  );
};

export default RegisterPage;
