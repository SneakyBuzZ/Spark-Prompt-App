import { auth } from "@/authentication/auth";

const page = async () => {
  const session = await auth();
  return (
    <>
      <h1>NAME : {session?.user?.name}</h1>
      <h1>ID : </h1>
    </>
  );
};

export default page;
