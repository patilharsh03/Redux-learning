// import { useSelector } from "react-redux";
// import PostAuthor from "./PostAuthor";
// import { selectAllPosts, Post } from "./postsSlice";
// import TimeAgo from "./TimeAgo";
// import ReactionButton from "./ReactionButton";

// const PostsList = () => {
//   const posts: Post[] = useSelector(selectAllPosts)

//   const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

//   const renderedPosts = orderedPosts.map((post: Post) => (
//     <article key={post.id}>
//         <h3>{post.title}</h3>
//         <p>{post.content.substring(0, 100)}</p>
//         <p className="postCredit">
//           <PostAuthor userId={post.userId} />
//           <TimeAgo timestamp={post.date} />
//         </p>
//         <ReactionButton post={post} />
//     </article>
//   ))

//   return (
//     <section>
//         <h2>Posts</h2>
//         {renderedPosts}
//     </section>
//   )
// }

// export default PostsList

import { useSelector } from "react-redux";
import { Post, selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsList = () => {
  const posts: Post[] = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
export default PostsList;
