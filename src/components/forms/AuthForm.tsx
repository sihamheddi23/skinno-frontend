import React from "react";
import { Link } from "react-router-dom";

type AuthFormProps = {
    type: "Login" | "Register";
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ type, children, onSubmit }) => {
    
  return (
    <div className="min-h-screen flex items-center px-3 sm:justify-center bg-gray-100">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full sm:max-w-md my-9">
        <div className="mb-2">
          <Link to="/" className="text-blue-500">
            Back to Home
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">{type}</h2>
        <form onSubmit={onSubmit}>
          {children}
        </form>
        <p className="mt-4 text-center">
          {type === "Login" ? (
            <>
              Don't have an account?
              <Link to={"/register"} className="ml-1 text-blue-500">
                Register
              </Link>
            </>
          ) : (
            <>
              Do you have an account?
              <Link to="/login" className="ml-1 text-blue-500">
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
