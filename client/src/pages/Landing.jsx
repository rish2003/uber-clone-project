import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <div className="h-screen w-full pt-8 bg-[url('/traffic-control.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-between">
        {/* Header Section */}
        <img className="w-16 ml-8" src="/Uber_logo.png" alt="uber logo" />

        {/* Content Section */}
        <div className="bg-white py-6 px-6 pb-8 rounded-t-3xl shadow-lg mx-4 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Get Started With Uber
          </h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
