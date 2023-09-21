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
    label: "Własne hasło",
    name: "customWord",
    disabledFn: (playersLength: number) => Number(playersLength) === 1,
    disabledLabel:
      "Potrzebujesz przynajmniej dwóch graczy aby zagrać z własnym hasłem",
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
    label: "Wybierz język hasła do odgadnięcia",
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
        name: "Trudna",
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
    label: "Kategoria hasła",
    name: "category",
    InvisibleFn: (customWord: boolean) => !customWord,
    options: [
      {
        value: "Zwierzęta",
        name: "Zwierzęta",
      },
      {
        value: "Kraje",
        name: "Kraje",
      },
      {
        value: "Jedzenie",
        name: "Jedzenie",
      },
      {
        value: "Zawód",
        name: "Zawód",
      },
      {
        value: "Film",
        name: "Film",
      },
      {
        value: "Sport",
        name: "Sport",
      },
      {
        value: "Kolor",
        name: "Kolor",
      },
      {
        value: "Muzyka",
        name: "Muzyka",
      },
      {
        value: "Sławni ludzie",
        name: "Sławni ludzie",
      },
      {
        value: "Programy teleizyjne",
        name: "Programy telewizyjne",
      },
      {
        value: "Miasta",
        name: "Miasta",
      },
      {
        value: "Podróż",
        name: "Podróż",
      },
      {
        value: "Rozrywka",
        name: "Rozrywka",
      },
      {
        value: "Technologia",
        name: "Technologia",
      },
      {
        value: "Rośliny",
        name: "Rośliny",
      },
      {
        value: "Inna",
        name: "Inna",
      },
    ],
  },
];
