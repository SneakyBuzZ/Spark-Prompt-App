import "@/styles/globals.css";

export const metadata = {
  title: "Spark",
  description: "Discover and share your prompts",
};

interface AuthLayoutType {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutType) => {
  return (
    <div className={` z-10 h-screen flex flex-col  justify-center`}>
      <div className="gradient"></div>
      {children}
    </div>
  );
};

export default AuthLayout;
