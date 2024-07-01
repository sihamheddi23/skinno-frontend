import { useFormik } from "formik";
import AuthForm from "../components/forms/AuthForm";
import Input from "../components/generics/Input";
import SubmitButton from "../components/generics/SubmitButton";



const LoginPage = () => {
  const formik = useFormik();
  return (
    <AuthForm type="Login">
      <Input
        name="emailOrUsernameOrPhone"
        type="text"
        placeholder="Enter your email or username or phone"
        labelText="Email or phone number or username"
        id="emailOrUsernameOrPhone"
      />
      <Input
        name="password"
        type="password"
        placeholder="Enter your password"
        labelText="Password"
        id="password"
      />
      <SubmitButton name="Login" />
    </AuthForm>
  );
};

export default LoginPage;
