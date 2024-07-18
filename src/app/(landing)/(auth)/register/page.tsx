import RegisterForm from "@/app/(landing)/(auth)/register/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-center">Register</h1>

      <RegisterForm />
    </div>
  );
}
export default RegisterPage;
