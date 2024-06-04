import { CardWrapper } from "@/components/card/CardWrapper";
import { RegisterForm } from "@/components/form/RegisterForm";

const Register = async () => {
  return (
    <>
      <CardWrapper
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
        headerLabel="Register to create and save your prompts"
        showSocials
      >
        <RegisterForm />
      </CardWrapper>
    </>
  );
};

export default Register;
