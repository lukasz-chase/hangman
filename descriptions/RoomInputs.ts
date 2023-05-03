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
    label: "Prywatne lobby",
    name: "privateRoom",
    disabledFn: () => false,
  },
  {
    label: "Własne słowo",
    name: "customWord",
    disabledFn: (playersLength: number) => Number(playersLength) === 1,
    disabledLabel:
      "Potrzebujesz przynajmniej dwóch graczy aby zagrać z własnym słowem",
  },
];
export const rangeInputs: rangeType[] = [
  {
    label: "Liczba graczy",
    name: "playersLimit",
    min: 1,
    max: 5,
    options: [1, 2, 3, 4, 5],
  },
  {
    label: "Czas gry (w minutach)",
    name: "roundTime",
    min: 1,
    max: 3,
    options: [1, 2, 3],
  },
  {
    label: "Liczba rund",
    name: "roundsNumber",
    min: 1,
    max: 5,
    options: [1, 2, 3, 4, 5],
  },
];

export const selectInput: selectType[] = [
  {
    label: "Wybierz język słowa do odgadnięcia",
    name: "language",
    InvisibleFn: () => false,
    options: [
      {
        value: "polski",
        name: "Polski",
      },
      {
        value: "angielski",
        name: "Angielski",
      },
      {
        value: "hiszpański",
        name: "Hiszpański",
      },
      {
        value: "niemiecki",
        name: "Niemiecki",
      },
      {
        value: "francuski",
        name: "Francuski",
      },
    ],
  },
  {
    label: "Trudność gry",
    name: "difficulty",
    InvisibleFn: () => false,
    options: [
      {
        value: 6,
        name: "Ciężka",
      },
      {
        value: 8,
        name: "Średnia",
      },
      {
        value: 10,
        name: "Łatwa",
      },
    ],
  },
  {
    label: "Kategoria słowa",
    name: "category",
    InvisibleFn: (customWord: boolean) => !customWord,
    options: [
      {
        value: "animals",
        name: "Zwierzęta",
      },
      {
        value: "countries",
        name: "Kraje",
      },
      {
        value: "foods",
        name: "Jedzenie",
      },
      {
        value: "jobs",
        name: "Zawód",
      },
      {
        value: "movies",
        name: "Film",
      },
      {
        value: "sports",
        name: "Sport",
      },
      {
        value: "colors",
        name: "Kolor",
      },
      {
        value: "music",
        name: "Muzyka",
      },
      {
        value: "famousPeople",
        name: "Sławni ludzie",
      },
      {
        value: "tvShows",
        name: "Programy telewizyjne",
      },
      {
        value: "cities",
        name: "Miasta",
      },
      {
        value: "travel",
        name: "Podróż",
      },
      {
        value: "entertainment",
        name: "Rozrywka",
      },
      {
        value: "technology",
        name: "Technologia",
      },
      {
        value: "plants",
        name: "Rośliny",
      },
      {
        value: "other",
        name: "Inna",
      },
    ],
  },
];
