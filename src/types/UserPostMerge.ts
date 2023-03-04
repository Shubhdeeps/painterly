import { Post } from "./Post";
import { User } from "./User";

export interface UserPost {
    user: User;
    post: Post;
}