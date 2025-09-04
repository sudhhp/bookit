import { toJalaali } from "jalaali-js";

const Footer = () => {
  const currentDate = new Date();
  const persianYear = toJalaali(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  ).jy; // Convert to Persian year

  return (
    <footer className="py-6">
      {" "}
      {/* Use <footer> instead of <Footer> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {persianYear} Bookit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
