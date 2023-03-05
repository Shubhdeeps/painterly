import { Post } from "./Post";
import { Profile } from "./Profile";

export interface UserPost {
    user: Profile;
    post: Post;
}