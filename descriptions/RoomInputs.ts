export type checkboxType = {
  label: string;
  name: string;
  disabledFn: (any: number) => boolean;
  disabledLabel?: string;
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
  InvisibleFn: (any: boolean) => boolean;
  options: {
    name: string;
    value: string | number;
  }[];
};

export const checkboxes: checkboxType[] = [
  {
    label: "Private room",
    name: "privateRoom",
    disabledFn: () => false,
  },
  {
    label: "Custorm word",
    name: "customWord",
    disabledFn: (playersLength: number) => Number(playersLength) === 1,
    disabledLabel: "Custorm word is available only for 2 or more players",
  },
];
export const rangeInputs: rangeType[] = [
  {
    label: "Players limit",
    name: "playersLimit",
    min: 1,
    max: 5,
    options: [1, 2, 3, 4, 5],
  },
  {
    label: "Game time (minutes)",
    name: "roundTime",
    min: 1,
    max: 3,
    options: [1, 2, 3],
  },
  {
    label: "Rounds number",
    name: "roundsNumber",
    min: 1,
    max: 5,
    options: [1, 2, 3, 4, 5],
  },
];

export const selectInput: selectType[] = [
  {
    label: "Choose language of the word",
    name: "language",
    InvisibleFn: () => false,
    options: [
      {
        value: "polish",
        name: "Polish",
      },
      {
        value: "english",
        name: "English",
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
  {
    label: "Choose difficulty",
    name: "difficulty",
    InvisibleFn: () => false,
    options: [
      {
        value: 6,
        name: "Hard",
      },
      {
        value: 8,
        name: "Medium",
      },
      {
        value: 10,
        name: "Easy",
      },
    ],
  },
  {
    label: "Choose category",
    name: "category",
    InvisibleFn: (customWord: boolean) => !customWord,
    options: [
      {
        value: "animals",
        name: "Animals",
      },
      {
        value: "country",
        name: "Country",
      },
      {
        value: "food",
        name: "Food",
      },
      {
        value: "job",
        name: "Job",
      },
      {
        value: "movie",
        name: "Movie",
      },
      {
        value: "Sport",
        name: "Sport",
      },
      {
        value: "color",
        name: "Color",
      },
      {
        value: "music",
        name: "Music",
      },
      {
        value: "famous people",
        name: "Famous people",
      },
      {
        value: "tv shows",
        name: "Tv shows",
      },
      {
        value: "city",
        name: "City",
      },
      {
        value: "travel",
        name: "Travel",
      },
      {
        value: "entertainment",
        name: "Entertainment",
      },
      {
        value: "Technology",
        name: "technology",
      },
      {
        value: "plants",
        name: "Plants",
      },
      {
        value: "other",
        name: "Other",
      },
    ],
  },
];
