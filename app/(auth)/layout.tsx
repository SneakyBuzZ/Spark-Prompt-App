import "@styles/globals.css";

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
        <div className="main">
          <div className="graident" />
          <main className="app">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
