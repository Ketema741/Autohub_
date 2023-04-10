import React from "react";

const AboutUsCard = () => {
  return (
    <div className="mt-16 ">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              AutoHub Vehicle Service development is carried out by passionate
              developers
            </h2>
            <p className="mt-6 text-gray-600 text-base">
              Welcome to AutoHub, your one-stop-shop for everything related to
              your vehicle. We are a centralized system that provides a variety
              of services to make your vehicle ownership experience hassle-free
              and convenient. At AutoHub, we provide services ranging from
              vehicle repair and maintenance to car washing and detailing. Our
              team of experienced professionals is committed to providing
              high-quality services and ensuring that your vehicle is always in
              top condition. In addition to our repair and maintenance services,
              we also offer an e-commerce platform for vehicle accessories.
              Whether you need new tires, a roof rack, or a new stereo system,
              we have everything you need to enhance your driving experience.
              Our platform is user-friendly and easy to navigate, so you can
              find exactly what you need in no time. Are you in need of a
              professional driver for your next trip? Look no further than
              AutoHub. We offer job opportunities for professional drivers,
              ensuring that you can find the right driver for your needs. At
              AutoHub, we understand the importance of staying informed about
              your vehicle. That's why we offer a blog section where we share
              information and experiences related to vehicle ownership. Our blog
              covers a variety of topics, including vehicle maintenance tips,
              driving safety, and more. We take pride in our commitment to
              providing exceptional service and ensuring that our customers have
              everything they need for their vehicles. Whether you're in need of
              a repair, accessory, or driver, we've got you covered.
            </p>
            <p className="mt-4 text-gray-600">
              Thank you for choosing Autohub, and we look forward to serving
              you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
