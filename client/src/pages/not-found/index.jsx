import { Link } from 'react-router-dom'; // If using React Router
import nfImg from "../../assets/servilink.webp";

function NotFound() {
  return (
    <div className="min-h-screen bg-grayf-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-2">Oops! Page not found.</p>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition"
        >
          Go back home
        </Link>
      </div>

      <div className="mt-10 w-72 opacity-60">
        <img
          src={nfImg} 
          alt="Not Found Illustration"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default NotFound;
