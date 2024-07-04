import { useFormik } from "formik";
import AuthForm from "../components/forms/AuthForm";
import Input from "../components/generics/Input";
import SubmitButton from "../components/generics/SubmitButton";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { alertSuccess } from "../utils/toasts";

const signinSchema = Yup.object().shape({
  usernameOrEmailOrPhoneNumber: Yup.string().required("Above field is required"),
  password: Yup.string().required(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const  {loadingUser:loading, err}= useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      usernameOrEmailOrPhoneNumber: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUser(values))
      .unwrap()
      .then((result) => {
        alertSuccess(result.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
    },
    validationSchema: signinSchema,
  });

  return (
    <AuthForm type="Login" onSubmit={formik.handleSubmit}>
      {loading && <p className="text-blue-500 my-2">Loading ...</p>}
      {err && <p className="text-red-500 my-2">{err}</p>}

      <Input
        name="usernameOrEmailOrPhoneNumber"
        type="text"
        placeholder="Enter your email or username or phone"
        labelText="Email or phone number or username"
        id="usernameOrEmailOrPhoneNumber"
        value={formik.values.usernameOrEmailOrPhoneNumber}
        onChange={formik.handleChange}
        errors={formik.errors.usernameOrEmailOrPhoneNumber}
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
      <SubmitButton name="Login" />
    </AuthForm>
  );
};

export default LoginPage;
