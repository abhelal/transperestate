import React from "react";
import Image from "next/image";
import image404 from "../public/images/404.png";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-100 p-4">
      <Image src={image404} alt="404 not found" width={600} height={600} />
      <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
      <p className="text-lg text-gray-600 mt-4">We can't seem to find the page you're looking for.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition duration-300">
        Go Back Home
      </Link>
    </div>
  );
};

export default Custom404;
