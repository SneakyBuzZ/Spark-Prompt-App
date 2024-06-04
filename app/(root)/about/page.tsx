import { auth } from "@/authentication/auth";
import React from "react";

const About = () => {
  const session = auth();
  return <div>{JSON.stringify(session)}</div>;
};

export default About;
