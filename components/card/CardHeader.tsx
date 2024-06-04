import { cn } from "@/lib/utils";
import { Passion_One } from "next/font/google";

const passion_one = Passion_One({
  subsets: ["latin-ext"],
  weight: ["400"],
});

interface CardHeadingProps {
  label: string;
}

export const CardHeading = ({ label }: CardHeadingProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-2">
      <h1 className={cn("text-4xl text-[#FF6060]", passion_one.className)}>
        Spark
      </h1>
      <p className=" -translate-y-1 text-center text-sm text-neutral-500">
        {label}
      </p>
    </div>
  );
};
