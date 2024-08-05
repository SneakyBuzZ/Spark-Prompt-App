import { CardWrapper } from "@/components/card/CardWrapper";
import { LoginForm } from "@/components/form/LoginForm";

const Login = async () => {
  return (
    <>
      <CardWrapper
        backButtonHref="/register"
        backButtonLabel="Do not have an account?"
        headerLabel="Credential authentication is not yet available please use Google or Github"
        showSocials
      >
        <LoginForm />
      </CardWrapper>
    </>
  );
};

export default Login;
