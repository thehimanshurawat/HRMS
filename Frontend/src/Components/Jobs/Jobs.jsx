import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./Jobs.css";
import { FaSearch } from "react-icons/fa";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");

  const internships = [
    {
      title: "Frontend Developer",
      skills: "React, Tailwind CSS, HTML, CSS, JavaScript, Git",
      type: "Internship",
    },
    {
      title: "Backend Developer",
      skills:
        "Node.js, Express.js, RESTful APIs, SQL/NoSQL databases, Git, Docker",
      type: "Internship",
    },
    {
      title: "React.js Developer",
      skills: "React.js, JavaScript, Redux, HTML, CSS, Git",
      type: "Internship",
    },
    {
      title: "Python Developer",
      skills:
        "Python, Django/Flask, REST APIs, SQL/NoSQL databases, Git, Docker",
      type: "Internship",
    },
    {
      title: "MERN Stack Developer",
      skills:
        "MongoDB, Express.js, React.js, Node.js, JavaScript, REST APIs, Git, Docker",
      type: "Internship",
    },
    {
      title: "Spring Boot Developer",
      skills:
        "Java, Spring Boot, REST APIs, SQL/NoSQL databases, Git, Maven, Docker",
      type: "Internship",
    },
    {
      title: "Software Tester",
      skills:
        "Manual Testing, Automated Testing, Selenium, JUnit, TestNG, Bug Tracking Tools, Git",
      type: "Internship",
    },
    {
      title: "WIX Web Developer",
      skills: "Wix, HTML, CSS, JavaScript, SEO, Graphic Design, UX/UI Design",
      type: "Internship",
    },
  ];

  const filteredInternships = internships.filter(
    (internship) =>
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobContainer mx-auto">
      <div className="p-6 mx-auto rounded-lg  border-gray-300 max-w-full max-[330px]:text-[8px]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center  space-y-2 sm:space-y-0">
          <div className="flex items-center bg-gray-50 border border-gray-300 p-2 rounded-lg sm:w-1/4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none focus:ring-0 focus:outline-none bg-transparent ms-2 text-gray-950 jobInput"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() =>
              window.open(
                "https://career.entrepreneurshipnetwork.net/",
                "_blank"
              )
            }
            className="p-2 bg-violet-500 text-white rounded-md flex items-center gap-1 ExportButton"
          >
            <IoIosAddCircleOutline className="text-2xl" />
            Add new Job
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 JobCard">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship, index) => (
              <div
                key={index}
                className="bg-gray-100 JobCard p-6 mx-auto rounded-lg shadow-md border border-gray-300 max-w-full max-[330px]:text-[8px] attendance"
              >
                <h3 className="text-xl font-semibold jobTitle">{internship.title}</h3>
                <p className="text-gray-400 jobType">{internship.type}</p>
                <p className="text-gray-700 mb-4 jobSkills">{internship.skills}</p>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://docs.google.com/forms/d/e/1FAIpQLScMY6Dos28JVDpYmgXB9FK4QpepWxsn_rEH-mQ1AYiql4d_qA/viewform")
                  }
                  className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-700 cursor-pointer jobApplyButton"
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No jobs found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
