export type Session = {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  expires: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type GuestUser = {
  id: string;
  name: string;
  avatar: string;
};
