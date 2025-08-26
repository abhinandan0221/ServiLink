import { Outlet } from "react-router-dom";
import servilinkLogo from "../../assets/servilink.png"; // Import logo for the layout

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-green-400">
      {/* Left Section: Logo and Welcome Message */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-blue-500 w-1/2 px-12 text-white">
        <img
          src={servilinkLogo}
          alt="servilink Logo"
          className="w-[200px] h-[200px] mb-8"
        />

        <div className="max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to serviLink
          </h1>
          <p className="text-lg text-gray-300 font-semibold">
            A modern, crowd-powered local services directory
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-green-300">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;