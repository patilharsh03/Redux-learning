import { useSelector, useDispatch } from "react-redux";
import { Post, selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()

// The ThunkDispatch type takes three type arguments:
// The type of the state in your Redux store (any in this example).
// The type of any extra argument that your thunks may take (any in this example).
// The type of the action that your dispatch function can handle (AnyAction in this example).
// By using the ThunkDispatch type, we can ensure that the dispatch function can handle thunks as well as regular actions.

  const posts: Post[] = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);


  // useEffect giving me an error

  // useEffect(() => {
  //   if (postsStatus === 'idle') {
  //     dispatch(fetchPosts())
  //   }
  // }, [postsStatus, dispatch])

  if (postsStatus === 'idle') {
    dispatch(fetchPosts())
  }

  let content;
  if (postsStatus === 'loading') {
    content = <p>"Loading..."</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
}
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostsList;
