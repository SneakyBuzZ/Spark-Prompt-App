import NavBar from "@components/home/NavBar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Spark",
  description: "Discover and share your prompts",
};

interface RootLayoutType {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutType) => {
  return (
    <html lang="en">
      <body>
        <div className={`${inter.className} main z-10`}>
          <div className="gradient" />
          <main className="spark-app w-full">
            <NavBar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
