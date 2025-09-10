import { Vazirmatn } from "next/font/google";
import "@/assets/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthWrapper from "@/components/AuthWrapper";
import { ToastContainer } from "react-toastify";
import checkAuth from "@/actions/checkAuth";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
});

export const metadata = {
  title: "BookIT App",
  description: "BookIT | BOOK A Meeting Or Conference Room For Your Team",
};

export default async function RootLayout({ children }) {
  const auth = await checkAuth();

  return (
    <html lang="en">
      <body className={vazirmatn.className}>
        <AuthWrapper>
          <Header
            initialUser={auth.user ?? null}
            initialIsAuthenticated={auth.isAuthenticated ?? false}
          />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </AuthWrapper>
      </body>
    </html>
  );
}
