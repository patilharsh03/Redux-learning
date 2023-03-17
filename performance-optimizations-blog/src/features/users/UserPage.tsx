import { useSelector } from "react-redux";
import { selectUserById } from "./UsersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { User } from "./UsersSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user: User | undefined = useSelector((state: RootState) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state: RootState) => selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    );
  });

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;