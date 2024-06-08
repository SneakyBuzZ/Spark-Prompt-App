import { Passion_One } from "next/font/google";
import { Input } from "@/components/ui/input";
import PromptFeed from "@/components/prompt/PromptFeed";

const passion_one = Passion_One({
  subsets: ["latin-ext"],
  weight: ["700"],
});

const Home = () => {
  return (
    <>
      <section className="spark-flex-col">
        <div
          className={`${passion_one.className} spark-home-heading mb-5 md:mb-10`}
        >
          Unleash your AI creativity and join the{" "}
          <span className=" text-[#FF6060]">Spark</span> write{" "}
          <span className="text-neutral-700">prompts</span>, share{" "}
          <span className="text-neutral-700">ideas</span>, and ignite the
          <span className="text-blue-500"> future of AI</span> together!
        </div>
        <Input
          className="w-2/3 md:w-[30rem] spark-form-search glassmorphic"
          placeholder="Search "
        />
        <div className="w-full">
          <PromptFeed />
        </div>
      </section>
    </>
  );
};

export default Home;
