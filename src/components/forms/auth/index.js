import AuthForm from "./Auth.form";

export const SigninForm = () => {
  return <AuthForm isSignup={false} />;
};

export const SignupForm = () => {
  return <AuthForm isSignup={true} />;
};