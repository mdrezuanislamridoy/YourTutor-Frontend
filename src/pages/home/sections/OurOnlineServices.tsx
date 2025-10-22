import React from "react";
import { BsCameraVideo, BsCloudDownload, BsLaptop } from "react-icons/bs";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  iconBgColor,
  iconColor,
}) => (
  <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-3xl shadow-lg transition duration-300 hover:shadow-xl h-full">
    <div
      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${iconBgColor}`}
    >
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4 min-h-[56px] flex items-center justify-center">
      {title}
    </h3>
    <p className="text-base text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default function OurOnlineServices() {
  const services = [
    {
      title: "Live Class",
      description:
        "Join interactive, real-time sessions with expert mentors. Ask questions, collaborate, and get instant feedback in a dynamic learning environment.",
      icon: BsLaptop,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Recorded Class",
      description:
        "Access a vast library of high-quality, pre-recorded lessons. Study at your own pace, rewind complex topics, and review material anytime, anywhere.",
      icon: BsCameraVideo,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Digital Product",
      description:
        "Download tools like our productivity chrome extension, software plugins, e-books, and other resources to enhance your learning journey.",
      icon: BsCloudDownload,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Online Services.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            YourTutor is one powerful online software suite that combines all
            the tools needed to run a successful school or office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              iconBgColor={service.iconBgColor}
              iconColor={service.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
