"use client";

import React from "react";

import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { Carousel, Button, Spacer, Badge, Card, Divider, Heading, Paragraph } from "flowbite-react";

const PropertyDetails = () => {
  // Sample property details data
  const propertyDetails = {
    title: "Luxury Apartment with Ocean View",
    location: "Malibu, California",
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
    <div className="max-w-4xl mx-auto p-4">
      <Carousel>
        {propertyDetails.images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Property Image ${index + 1}`}
            className="object-cover w-full h-64"
          />
        ))}
      </Carousel>

      <div className="mt-4">
        {/* <Heading size="2xl">{propertyDetails.title}</Heading>
        <Paragraph className="text-gray-600">{propertyDetails.location}</Paragraph>

        <div className="flex items-center mt-2">
          <Badge variant="success" className="mr-2">
            Superhost
          </Badge>
          <Badge variant="warning">
            <AiFillStar className="text-yellow-500 mr-1" />
            {propertyDetails.rating}
          </Badge>
          <Spacer />
          <Paragraph className="text-gray-600">{propertyDetails.reviews} reviews</Paragraph>
        </div> */}
        {/* 
        <Divider className="my-4" />

        <div className="flex items-center">
          {propertyDetails.amenities.map((amenity, index) => (
            <Badge key={index} variant="info" className="mr-2">
              {amenity}
            </Badge>
          ))}
        </div> */}
        {/* 
        <Divider className="my-4" />

        <Paragraph>{propertyDetails.description}</Paragraph>

        <Divider className="my-4" />

        <Card>
          <Card.Body>
            <Heading size="lg" className="mb-2">
              Booking Details
            </Heading>
            <Paragraph className="mb-2">Price: $200/night</Paragraph>
            <Paragraph className="mb-2">Minimum stay: 3 nights</Paragraph>
            <Paragraph>Check-in: After 3:00 PM | Check-out: Before 11:00 AM</Paragraph>
          </Card.Body>
        </Card> */}

        {/* <Divider className="my-4" /> */}

        <div className="flex items-center">
          <Button variant="primary" className="mr-4">
            Book Now
          </Button>
          <Button variant="outline" className="text-gray-600">
            <AiOutlineHeart className="mr-1" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
