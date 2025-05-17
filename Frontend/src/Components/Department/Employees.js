import image1 from "../../assets/department_image/image1.svg"
import image2 from "../../assets/department_image/image2.svg"
import image3 from "../../assets/department_image/image3.svg"
import image4 from "../../assets/department_image/image4.svg"
import image5 from "../../assets/department_image/image5.svg"
import image6 from "../../assets/department_image/image6.svg"
const allEmployees = {
  "hr-associates": [
    {
      id: "124355111",
      name: "Brooklyn Simmons",
      type: "Office",
      status: "Permanent",
      image: image1,
    },
    {
      id: "345321233",
      name: "Darlene Robertson",
      type: "Office",
      status: "Permanent",
      image: image2,
    },
    {
      id: "987890345",
      name: "Floyd Miles",
      type: "Office",
      status: "Permanent",
      image: image3,
    },
    {
      id: "453367122",
      name: "Cody Fisher",
      type: "Office",
      status: "Permanent",
      image: image4,
    },
    {
      id: "345321231",
      name: "Dianne Russell",
      type: "Remote",
      status: "Permanent",
      image: image5,
    },
    {
      id: "453677881",
      name: "Savannah Nguyen",
      type: "Office",
      status: "Permanent",
      image: image6,
    },
    {
      id: "009918765",
      name: "Jacob Jones",
      type: "Remote",
      status: "Permanent",
      image: image6,
    },
    {
      id: "238870122",
      name: "Marvin McKinney",
      type: "Remote",
      status: "Permanent",
      image: image1,
    },
    {
      id: "435549099",
      name: "Kristin Watson",
      type: "Office",
      status: "Permanent",
      image: image1,
    },
    {
      id: "00981289008",
      name: "Kathryn Murphy",
      type: "Office",
      status: "Permanent",
      image: image1,
    },
    {
      id: "34532123189",
      name: "Dianne Russell",
      type: "Remote",
      status: "Permanent",
      image: image5,
    },
    {
      id: "45367788167",
      name: "Savannah Nguyen",
      type: "Office",
      status: "Permanent",
      image: image6,
    },
    {
      id: "00991876556",
      name: "Jacob Jones",
      type: "Remote",
      status: "Permanent",
      image: image6,
    },
    {
      id: "23887012245",
      name: "Jones McKinney",
      type: "Remote",
      status: "Permanent",
      image: image1,
    },
    {
      id: "43554909923",
      name: "Kristin Watson",
      type: "Office",
      status: "Permanent",
      image: image1,
    },
    {
      id: "00981289012",
      name: "Kathryn Murphy",
      type: "Office",
      status: "Permanent",
      image: image1,
    },
  ],
  "sr-hr-associates": [
    {
      id: "009812890",
      name: "Kathryn Murphy",
      type: "Office",
      status: "Permanent",
      image: image1,
    },
    { 
      id: "009918765", 
      name: "Jacob Jones", 
      type: "Remote", 
      status: "Permanent", 
      image: "https://s3-alpha-sig.figma.com/img/573f/9e95/d05c616a6eb42b46b77114ca84eaaabc?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UcnJ5355XDztSdWbxgZ0sRO1WNg2PnIbpqMca2rKRzRRvDts2feX~leT2l6X5HTBuAxBtD82GRGAXnIloJwi2Ud4E2oqWNTQkdDdO0VtGZs7Eu-YNTjMrM6RiISQlp014eM81VrUqWRa8aFunAiWZp2A3tfPTjyCg3RJ9PIyL00natZ3IGh4R9h7QXYHvNZBZyHzNlBJ6KMHZZlCxrLHIuQ8WazctQZbbxF729AZ5u4F62C9l~tCW2uaYUvx2PSZfYT8b~xJSrg587hFdpZzA6UszsjkysKTKi92PONxEahvByJpIvmOY4ZIblNwnTgxvlI8G05d~9JCen73jkCv7A__" },
    { 
      id: "238870122", 
      name: "Marvin McKinney", 
      type: "Remote", 
      status: "Permanent", 
      image: "https://s3-alpha-sig.figma.com/img/0259/2dae/9691f748e3c6f31905cf933ce6cc4290?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y8OYI7yPrIQbvCjABmbDGMIEPX4mI3jy9oOOh7K3w87oaP76zwz6DQuodkvL~GiRq0Smaf~H0h5SNDGTbGtwx3X1uJBeo7UmGN0JcY-1~W04KCw6hppn6pTviUg3JL7HDzeUja7AlqVvz7GhrAwosrb7BjaH-tsmwkOsIc2jNRg8g7LpytQ-gU8LDiYVuRWstLb5zl-30Mp9pmR6f8ufIKgm86SblhAraKnRY8tLjkfDDWEMSVnlUDcEL9LTKrT6pc8O3-aPlYnV-ctZk4PDyxiDO-dkwvBeSjewd0HLa6a1ZcGinfwSxJtLsX8pscdP9D083yzewa6S2OTXrc4Heg__" },
    { 
      id: "435540099", 
      name: "Kristin Watson", 
      type: "Office", 
      status: "Permanent", 
      image: "https://s3-alpha-sig.figma.com/img/e512/8ad2/8deceac56443041edd2d47c9dae21163?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nOiY8a3ucRdeQkj0fwELULn2qk3~fwigAuAITLDNKRU3hblgp-vxvNkIBsKt-XxZ9g250bB8hlzHh-PrGiftXqKDthzr99ehghBkwKMU-hOn-NAG53Pqet8QECK3E48HsPGeXQu8W3~1FHzhC5FKL0QosQ35McF2bzBKLWYLoWgGhMXPJ9ot-7Em48Yi8KIVjAgsK1KWITILkXJ4ieHjz4-eC1TOemiEyI-6ztizq3sTJSFlVfZ7CNTQiZEfLJNV42aOuQBDKbrP0e-qZaISO1hvlsfcS0CruOtVtK~-6-xAdCNj4pHd1BPFrhXd7K0GP~xk~0HFmv1m-SxUFtKPgA__" },
    { 
      id: "009812890", 
      name: "Devon Lane", 
      type: "Remote", 
      status: "Permanent", 
      image: "https://s3-alpha-sig.figma.com/img/d214/1dcc/6e1d41cec47b276f00b1030719afdb7f?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=N6SC-J7ffCqd8D4WGcNOu4sVLmWW9gPootnpVEDt5GXDhoTvQIrPSd4sXROZQaYf6rod3COgROaOEB1rpejt8QTiXIfjfH2XAI~SOr-dGPhYhR1mzUBupC5a~pQmG3zzGYHQT5Ixpz4c2ST6EmP0WFw~JvDhuFzs5eCFG8CgpLsfxVBAp7HLqNRohqFtoPgHNUvy6RGwUi72LGrCD-F9~bCBNX6dpYZ3G0rG-TtQ8mNJX5Tcxy5S80G-p-cWFd6RezPeh~0R1PawJLCZlrw7tzA8RwMBugk2MTXPhIdhtNdXZDlchRt1bWFGP52cHiIMGLyjroniPvrHL3FyfGaA2w__" },
  
  ],
}

export default allEmployees;