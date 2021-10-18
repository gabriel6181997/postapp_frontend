export type NewPost = {
  title: string;
  postText: string
}

export type Post = {
  Likes: Like[];
  UserId: number
  createdAt: Date
  id: number
  postText: string
  title: string
  updatedAt: Date
  username: string
}

export type Like  = {
  id: number;
  PostId: number;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PostObject = {
  UserId: number;
  createdAt?: Date;
  id: number;
  postText: string;
  title: string;
  updatedAt?: Date;
  username: string;
}
