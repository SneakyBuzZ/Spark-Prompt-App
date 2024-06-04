import { CardWrapper } from "@/components/card/CardWrapper";
import { LoginForm } from "@/components/form/LoginForm";

const Login = async () => {
  return (
    <>
      <CardWrapper
        backButtonHref="/register"
        backButtonLabel="Do not have an account?"
        headerLabel="Please login with your credentials"
      >
        <LoginForm />
      </CardWrapper>
    </>
  );
};

export default Login;
