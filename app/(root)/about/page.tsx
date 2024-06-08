import { auth } from "@/authentication/auth";
import React from "react";

const About = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};

export default About;
