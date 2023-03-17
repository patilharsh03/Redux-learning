import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Post } from "./postsSlice";
import { Link } from "react-router-dom";
// import React from 'react'
import { useSelector } from "react-redux";
import { selectPostIds } from "./postsSlice";
import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// interface PostProps {
//   postId: Post;
// }
interface PostProps {
  postId: EntityId;
}

const PostsExcerpt = ({ postId }: PostProps) => {
  const post = useSelector((state: RootState) => selectPostIds(state, postId))

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={Number(post.userId)} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

// PostsExcerpt = React.memo(PostsExcerpt) // will not work on typescript like this

export default PostsExcerpt;
