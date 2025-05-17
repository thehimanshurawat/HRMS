import image1 from "../../assets/department_image/image1.svg";
import image2 from "../../assets/department_image/image2.svg";
import image3 from "../../assets/department_image/image3.svg";
import image4 from "../../assets/department_image/image4.svg";
import image5 from "../../assets/department_image/image5.svg";
import image6 from "../../assets/department_image/image6.svg";

export const department1 = [
  {
    name: "HR",
    members: 20,
    people: [
      { name: "HR Associates", link: "/role-details/hr-associates" },
      { name: "Sr HR Associates", link: "/role-details/sr-hr-associates" },
      { name: "Managers", link: "/role-details/managers" },
      { name: "Sr Managers", link: "/role-details/sr-managers" },
      { name: "Associate Director", link: "/role-details/associate-director" },
    ],
  },
];
export const departments = [
  {
    name: "Finance",
    members: 14,
    people: [
      {
        name: "Darrell Steward",
        role: "Sr. Sales Manager",
        image: image1,
      },
      {
        name: "Kristin Watson",
        role: "Sr. Sales Manager",
        image: image2,
      },
      {
        name: "Courtney Henry",
        role: "BDM",
        image: image3,
      },
      {
        name: "Kathryn Murphy",
        role: "BDE",
        image: image4,
      },
      {
        name: "Albert Flores",
        role: "Sales",
        image: image5,
      },
    ],
  },
  {
    name: "Managers",
    members: 18,
    people: [
      {
        name: "Leslie Alexander",
        role: "Sr. Project Manager",
        image: image6,
      },
      {
        name: "Ronald Richards",
        role: "Sr. Project Manager",
        image: image5,
      },
      {
        name: "Savannah Nguyen",
        role: "Project Manager",
        image: image4,
      },
      {
        name: "Eleanor Pena",
        role: "Project Manager",
        image: image3,
      },
      {
        name: "Esther Howard",
        role: "Project Manager",
        image: image2,
      },
    ],
  },
  {
    name: "Marketing Department",
    members: 10,
    people: [
      {
        name: "Wade Warren",
        role: "Sr. Marketing Manager",
        image: image1,
      },
      {
        name: "Brooklyn Simmons",
        role: "Sr. Marketing Manager",
        image: image6,
      },
      {
        name: "Kristin Watson",
        role: "Marketing Coordinator",
        image: image5,
      },
      {
        name: "Jacob Jones",
        role: "Marketing Coordinator",
        image: image3,
      },
      {
        name: "Cody Fisher",
        role: "Marketing",
        image: image2,
      },
    ],
  },
];
