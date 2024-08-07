import { api } from '@/lib/api-client';
import { Post, Todo, User } from '@/types/api';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';

const StyledReducerExample1 = styled.div`
  color: black;
`;

type State = {
  users: User[] | null;
  posts: Post[] | null;
  comments: Comment[] | null;
  todos: Todo[] | null;
  selectedUser: User | null;
  selectedPost: Post | null;
};

// アクションの型定義
type Action =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'SET_SELECTED_USER'; payload: User }
  | { type: 'SET_SELECTED_POSTS'; payload: Post };

const initialState: State = {
  users: null,
  posts: null,
  comments: null,
  todos: null,
  selectedUser: null,
  selectedPost: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    case 'SET_SELECTED_POSTS':
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
};

/**
 * useReducer を使って状態管理をする例
 */
export function ReducerExample1() {
  console.count('★★★ ReducerExample1 レンダリング ★★★');

  const [state, dispatch] = useReducer(reducer, initialState);

  // 画面表示時にデータを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get<User[]>('/users');
        dispatch({ type: 'SET_USERS', payload: data });

        const selectedUser = data[0];
        dispatch({ type: 'SET_SELECTED_USER', payload: selectedUser });
      } catch (error) {
        console.error('Failed to fetch user comments', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!state.selectedUser) return;

      try {
        const [postsRes, todosRes] = await Promise.all([
          api.get<Post[]>(`/users/${state.selectedUser.id}/posts`),
          api.get<Todo[]>(`/users/${state.selectedUser.id}/todos`),
        ]);

        dispatch({ type: 'SET_POSTS', payload: postsRes.data });
        dispatch({ type: 'SET_TODOS', payload: todosRes.data });

        const selectedPost = postsRes.data[0];
        dispatch({ type: 'SET_SELECTED_POSTS', payload: selectedPost });
      } catch (error) {
        console.error('Failed to fetch user posts and todos', error);
      }
    };

    fetchData();
  }, [state.selectedUser, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!state.selectedPost) return;

      try {
        const { data } = await api.get<Comment[]>(`/posts/${state.selectedPost.id}/comments`);
        dispatch({ type: 'SET_COMMENTS', payload: data });
      } catch (error) {
        console.error('Failed to fetch post comments', error);
      }
    };

    fetchData();
  }, [state.selectedPost, dispatch]);

  return (
    <StyledReducerExample1>
      <h1>Welcome to ReducerExample1!</h1>
      <div style={{ backgroundColor: 'lightpink' }}>{JSON.stringify(state.users)}</div>
      <div style={{ backgroundColor: 'aqua' }}>{JSON.stringify(state.posts)}</div>
      <div style={{ backgroundColor: 'lightgreen' }}>{JSON.stringify(state.comments)}</div>
      <div style={{ backgroundColor: 'lightblue' }}>{JSON.stringify(state.todos)}</div>
    </StyledReducerExample1>
  );
}

export default ReducerExample1;
