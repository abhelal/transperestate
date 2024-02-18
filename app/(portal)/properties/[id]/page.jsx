"use client";

import React from "react";

import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdBed } from "react-icons/io";
import { MdBathtub } from "react-icons/md";
import { Carousel, Button, Badge, Card } from "flowbite-react";
import { FaHome, FaPaw, FaMoneyBillWave } from "react-icons/fa";

const PropertyDetails = () => {
  // Sample property details data
  const propertyDetails = {
    name: "The King Palace",
    title: "Luxury Apartment with Ocean View",
    location: "Malibu, California",
    info: {
      bath: 3,
      bed: 4,
      member: "3-4",
    },

    rent: 2000,
    rating: 4.8,
    reviews: 120,
    amenities: ["Wi-Fi", "Parking", "Kitchen", "Gym"],
    description:
      "Enjoy breathtaking ocean views from this luxurious apartment in the heart of Malibu. The perfect getaway for a relaxing vacation with all the amenities you need.",
    images: [
      "https://source.unsplash.com/800x600/?luxury-apartment",
      "https://source.unsplash.com/800x600/?interior",
      "https://source.unsplash.com/800x600/?living-room",
      "https://source.unsplash.com/800x600/?bedroom",
    ],
  };

  return (
    <div className="w-full flex mx-auto gap-4">
      <div className="w-1/2 space-y-4">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            {propertyDetails.images.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Property Image ${index + 1}`} />
            ))}
          </Carousel>
        </div>
        <div className="bg-white p-4 rounded-lg space-y-3">
          <p className="text-lg font-semibold">{propertyDetails.name}</p>
          <div className="my-2 flex items-center gap-3 text-secondary-500 text-sm">
            <HiOutlineLocationMarker />
            <p className="text-gray-600">{propertyDetails.location}</p>
          </div>

          <div className="flex items-center">
            {propertyDetails.amenities.map((amenity, index) => (
              <Badge key={index} color="success" className="mr-2">
                {amenity}
              </Badge>
            ))}
          </div>

          <div>
            <p className="font-semibold">General Info</p>
            <div className="flex gap-2 items-center">
              <div className="flex items-center text-xs gap-1 bg-gray-50 p-0.5 px-2 rounded-md">
                <IoMdBed className="w-6 h-6" />
                <div>{propertyDetails.info.bed}</div>
                <p>Bed</p>
              </div>
              <div className="flex items-center text-xs gap-1 bg-gray-50 p-0.5 px-2 rounded-md">
                <MdBathtub className="w-4 h-4" />
                <div>{propertyDetails.info.bath}</div>
                <p>Bath</p>
              </div>

              <div className="flex items-center text-xs gap-1 bg-gray-50 p-0.5 px-2 rounded-md">
                <HiMiniUsers className="w-4 h-4" />
                <div>{propertyDetails.info.member}</div>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold">About</p>
            <p className="text-sm">{propertyDetails.description}</p>
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-primary-600 bg-opacity-25 rounded-full w-10 h-10 ">
                <FaHome className="text-xl text-primary-600" />
              </div>
              <div>
                <p className="font-semibold">Utilities</p>
                <p className="text-sm">Renter responsible for all utilities</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 bg-opacity-25 rounded-full w-10 h-10 flex items-center justify-center">
                <FaPaw className="text-2xl text-primary-600" />
              </div>

              <div>
                <p className="font-semibold">Pet Policy</p>
                <p className="text-sm">Pets Allowed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 bg-opacity-25 rounded-full w-10 h-10 flex items-center justify-center">
                <FaMoneyBillWave className="text-2xl text-primary-600" />
              </div>
              <div>
                <p className="font-semibold">Property details & Fees</p>
                <p className="text-sm">{`Must have 3x the rent in total household income (before taxes)`}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="my-4" />

        <div className="flex w-full items-center justify-end">
          <Button variant="primary" className="mr-4">
            Contact Us
          </Button>
          <Button outline className="text-primary-500">
            <AiOutlineHeart className="mr-1" />
            Schedule a tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
