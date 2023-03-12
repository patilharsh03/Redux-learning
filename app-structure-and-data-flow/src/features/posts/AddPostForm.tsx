// import { ChangeEvent, FormEvent, useState } from "react";
// import { postAdded } from "./postsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { selectAllUsers } from "../users/UsersSlice";

// interface FormValues {
//   title: string;
//   content: string;
//   userId: string;
// }

// const AddPostForm = () => {
//   const [formValues, setFormValues] = useState<FormValues>({
//     title: "",
//     content: "",
//     userId: "",
//   });
//   const dispatch = useDispatch();

//   const users = useSelector(selectAllUsers);

//   const { title, content, userId } = formValues

//   const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
//   setFormValues({ ...formValues, [e.target.name]: e.target.value });

//   const onSavePostClicked = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (title && content && userId) {
//       dispatch(
//         postAdded(title, content, userId)
//       );
//       setFormValues({ title: "", content: "", userId: ""});
//     }
//   };

//   const canSave = title && content && userId

//   const userOptions = users?.map((user) => (
//     <option key={user.id} value={user.id}>
//       {user.name}
//     </option>
//   ));

//   return (
//     <section>
//       <h2>Add a New Post</h2>
//       <form onSubmit={onSavePostClicked}>
//         <label htmlFor="postTitle">Post Title:</label>
//         <input
//           type="text"
//           id="postTitle"
//           name="postTitle"
//           value={title}
//           onChange={onInputChange}
//         />
//         <label htmlFor="postAuthor">
//           Author:</label>
//           <select
//             id="postAuthor"
//             value={userId}
//             onChange={onInputChange}
//           >
//             <option value=""></option>
//             {userOptions}
//           </select>
//         <label htmlFor="postContent">Content:</label>
//         <textarea
//           id="postContent"
//           name="postContent"
//           value={content}
//           onChange={onInputChange}
//         />
//         <button type="submit" disabled={!canSave}>
//           Save Post
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AddPostForm;


import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/UsersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [userId, setUserId] = useState<string>('')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
    const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm