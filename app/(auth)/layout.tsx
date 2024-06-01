import "@styles/globals.css";

export const metadata = {
  title: "Spark",
  description: "Discover and share your prompts",
};

interface AuthLayoutType {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutType) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <main className="spark-app">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default AuthLayout;
