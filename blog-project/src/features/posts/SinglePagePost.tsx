import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

import { useParams, Link } from "react-router-dom";

import { RootState } from "../../app/store";

const SinglePagePost = () => {
  const { postId } = useParams()

  const post = useSelector((state: RootState) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Page not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default SinglePagePost;
