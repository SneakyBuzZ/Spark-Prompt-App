"use client";

import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  return (
    <>
      <h1>NAME : {session?.user?.id}</h1>
      <h1>ID : </h1>
    </>
  );
};

export default page;
