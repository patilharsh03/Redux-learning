import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
    id: number,
    userId: number,
    title: string,
    completed: boolean,
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      transformResponse: (res: Todo[]) => res.sort((a: {id: number}, b: {id: number}) => b.id - a.id),
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ['Todos']
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
