"use client";

import { CardWrapper } from "@/components/card/CardWrapper";

const page = () => {
  return (
    <div>
      <CardWrapper
        headerLabel="Sorry for inconvinience"
        backButtonLabel="Back to login"
        backButtonHref="/login"
      >
        <h1 className="flex justify-center text-center text-2xl w-full">
          Oops Something went wrong..
        </h1>
      </CardWrapper>
    </div>
  );
};

export default page;
