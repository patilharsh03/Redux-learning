// import { useDispatch } from "react-redux";
// import { reactionAdded, Post } from "./postsSlice";

// const reactionEmoji = {
//   thumbsUp: "👍",
//   wow: "😲",
//   heart: "❤️",
//   rocket: "🚀",
//   coffee: "☕",
// };

// interface ReactionProps {
//     post: Post,
// }

// const ReactionButton = ({ post }: ReactionProps) => {
//   const dispatch = useDispatch();

//   const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
//     return (
//       <button
//         key={name}
//         type="button"
//         className="reactionButton"
//         onClick={() =>
//           dispatch(reactionAdded({ postId: post.id, reaction: name }))
//         }
//       >
//         {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
//       </button>
//     );
//   });
//   return <div>{reactionButtons}</div>
// };

// export default ReactionButton;

import { useDispatch } from "react-redux";
import { Post, reactionAdded } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

interface ReactionProps {
  post: Post,
}


const ReactionButton = ({ post }: ReactionProps) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name as keyof typeof reactionEmoji}))
                }
            >
                {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionButton