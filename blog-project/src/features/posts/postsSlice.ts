import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios'

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
  postId: string | number,
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

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost: Post) => {
  const {id} = initialPost;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
    return response.data
  } catch (err) {
    // return err.message;
    return initialPost
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost: Post) => {
  const { id } = initialPost
  const response = await axios.delete(`${POSTS_URL}/${id}`)
  if (response?.status === 200) return initialPost
  return `${response?.status}: ${response.statusText}`
})


const initialState: PostsState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | failed
  error: null,
  postId: '',
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
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return;
        }
        const { id } = action.payload
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter(post => post.id !== id)
        state.posts = [...posts, action.payload]
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // !action.payload?.id
        const payload = action.payload
        if (typeof payload === 'string') {
          console.log('Delete could not complete')
          console.log(action.payload)
          return;
        }
        // const { id } = action.payload
        const { id } = payload as Post
        const posts = state.posts.filter(post => post.id !== id)
        state.posts = posts
      })
  },
});

export const selectAllPosts = (state: { posts: PostsState; }) => state.posts.posts;
export const getPostsStatus = (state: { posts: PostsState; }) => state.posts.status;
export const getPostsError = (state: { posts: PostsState; }) => state.posts.error;

export const selectPostById = (state: { posts: PostsState; }, postId: string | number): Post | undefined => {
  const post = state.posts.posts.find(post => post.id === postId)
  return post ? post : undefined
}

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
