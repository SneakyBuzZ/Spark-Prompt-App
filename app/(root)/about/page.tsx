import { auth } from "@/authentication/auth";
import React from "react";

const About = async () => {
  const session = await auth();

  console.log("SESSION : ", session);

  return <div>{JSON.stringify(session)}</div>;
};

export default About;
