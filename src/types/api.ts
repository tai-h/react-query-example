export type BaseEntity = {
  id: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Post = Entity<{
  userId: number;
  title: string;
  body: string;
}>;

export type Comment = Entity<{
  postId: number;
  name: string;
  email: string;
  body: string;
}>;

export type Photo = Entity<{
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}>;

export type User = Entity<{
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}>;

export type Todo = Entity<{
  userId: number;
  title: string;
  completed: boolean;
}>;
