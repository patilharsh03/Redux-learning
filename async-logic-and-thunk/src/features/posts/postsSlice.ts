import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export interface Post {
  id: string;
  title: string;
  body: string;
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

interface PostsState {
  posts: Post[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null | string | undefined,
}

// ---- Async Thunk Logic ------- 

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: Post) => {
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data
})


const initialState: PostsState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | failed
  error: null
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state: PostsState, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
      builder.addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post: Post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post
        })

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {

        // const sortedPosts = state.posts.sort((a, b)=> {
        //   if (a.id > b.id) return 1
        //   if (a.id < b.id) return -1
        //   return 0
        // })
        // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1
        // action.payload.id = nanoid();
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }
        console.log(action.payload)
        state.posts.push(action.payload)
      })
  },
});

export const selectAllPosts = (state: { posts: PostsState; }) => state.posts.posts;
export const getPostsStatus = (state: { posts: PostsState; }) => state.posts.status;
export const getPostsError = (state: { posts: PostsState; }) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;


