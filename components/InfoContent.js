const bodyParts = [
  {
    id: 1,
    screen: "Arm",
    geometry: "coneGeometry",
    title: "Arm",
    bigtext: "Lorem Ipsum is simply dummy text",
    dots: [
      {
        dot_id: 1,
        position: [1, 2, 1],
      },
      {
        dot_id: 2,
        position: [-1, -1, -2],
      },
      {
        dot_id: 3,
        position: [2, -1, 1],
      },
    ],
  },
  {
    id: 2,
    screen: "Leg",
    geometry: "boxGeometry",
    title: "Leg",
    bigtext: "Lorem ipsum dolor sit amet",
    dots: [
      {
        dot_id: 1,
        position: [1, 1, 1],
      },
      {
        dot_id: 2,
        position: [-1, 1, -1],
      },
      {
        dot_id: 3,
        position: [-2, -2, 1],
      },
    ],
  },
];

export default bodyParts;
