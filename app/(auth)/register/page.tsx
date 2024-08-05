import { CardWrapper } from "@/components/card/CardWrapper";
import { RegisterForm } from "@/components/form/RegisterForm";

const Register = async () => {
  return (
    <>
      <CardWrapper
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
        headerLabel="Credential authentication is not yet available please use Google or Github"
        showSocials
      >
        <RegisterForm />
      </CardWrapper>
    </>
  );
};

export default Register;
