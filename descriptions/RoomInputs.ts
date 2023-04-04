export type checkboxType = {
  label: string;
  name: string;
};
export type inputType = {
  label: string;
  name: string;
};
export type rangeType = {
  label: string;
  name: string;
  min: number;
  max: number;
  options: number[];
};
export type selectType = {
  label: string;
  name: string;
  options: {
    name: string;
    value: string;
  }[];
};

export const checkboxes: checkboxType[] = [
  {
    label: "Private",
    name: "privateRoom",
  },
  {
    label: "Custom word",
    name: "customWord",
  },
];
export const rangeInputs: rangeType[] = [
  {
    label: "Number of players",
    name: "playersLimit",
    min: 1,
    max: 5,
    options: [1, 2, 3, 4, 5],
  },
  {
    label: "Round time (in minutes)",
    name: "roundTime",
    min: 1,
    max: 3,
    options: [1, 2, 3],
  },
];

export const selectInput: selectType[] = [
  {
    label: "Choose language for word to guess",
    name: "language",
    options: [
      {
        value: "english",
        name: "English",
      },
      {
        value: "polish",
        name: "Polish",
      },
      {
        value: "spanish",
        name: "Spanish",
      },
      {
        value: "german",
        name: "German",
      },
      {
        value: "french",
        name: "French",
      },
    ],
  },
];
