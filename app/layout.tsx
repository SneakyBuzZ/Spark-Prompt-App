import Provider from "@/components/shared/Provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import QueryProvider from "@/lib/query/Provider";

import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Spark",
  description: "Discover and share your prompts",
};

interface AppLayoutType {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutType) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/spark_logo.png" />
      </head>
      <body>
        <Provider>
          <QueryProvider>
            <div className={`${inter.className} main`}>
              <main className="spark-app w-full overflow-y-hidden">
                {children}
              </main>
            </div>
            <Toaster />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
};

export default AppLayout;
