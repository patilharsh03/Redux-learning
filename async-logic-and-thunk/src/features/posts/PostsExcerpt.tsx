import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Post } from "./postsSlice";

interface PostProps {
    post: Post,
}

const PostsExcerpt = ({ post }: PostProps) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  )
}

export default PostsExcerpt