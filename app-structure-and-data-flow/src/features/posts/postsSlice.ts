// import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
// import { sub } from 'date-fns'

// interface Reactions {
//   thumbsUp: number;
//   wow: number;
//   heart: number;
//   rocket: number;
//   coffee: number;
// }

// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   userId: string,
//   date: string,
//   reactions: Reactions,
// }

// interface PostsState extends Array<Post> {}

// const initialState: PostsState = [
//   {
//     id: "1",
//     title: "Learning Redux Toolkit",
//     content: "I have heard good things.",
//     userId: '',
//     date: sub(new Date(), { minutes: 10}).toISOString(),
//     reactions : {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     }
//   },
//   {
//     id: "2",
//     title: "Slices...",
//     content: "Pizza slice or what.",
//     userId: '',
//     date: sub(new Date(), { minutes: 5}).toISOString(),
//     reactions : {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     }
//   },
// ];

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     postAdded: {
//       reducer(state: PostsState, action: PayloadAction<Post>) {
//         state.push(action.payload);
//       },
//       prepare(title: string, content: string, userId: string) {
//         return {
//           payload: {
//             id: nanoid(),
//             title,
//             content,
//             userId,
//             date: new Date().toISOString(),
//             reactions: {
//               thumbsUp: 0,
//               wow: 0,
//               heart: 0,
//               rocket: 0,
//               coffee: 0,
//             },
//           },
//         };
//       },
//     },
//     reactionAdded(state, action: PayloadAction<{ postId: string, reaction: string }>) {

//       function isReaction(key: string): key is keyof Reactions {
//         return key in ({} as Reactions)
//       }

//       const { postId, reaction } = action.payload
//       const existingPost = state.find(post => post.id === postId)
//       if (existingPost && isReaction(reaction)) {
//         existingPost.reactions[reaction]++
//       }
//     }
//   },
// });

// export const selectAllPosts = (state: { posts: PostsState }) => state.posts;

// export const { postAdded, reactionAdded } = postsSlice.actions;

// export default postsSlice.reducer;

import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string,
  date: string,
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  },
}

type PostsState = Post[]

const initialState: PostsState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    userId: '',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: '',
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state: PostsState, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state: PostsState, action: PayloadAction<{ postId: string, reaction: keyof Post['reactions'] }>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state: { posts: PostsState; }) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
