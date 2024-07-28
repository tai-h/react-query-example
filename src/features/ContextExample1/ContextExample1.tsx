import { api } from '@/lib/api-client';
import { Post, Todo, User } from '@/types/api';
import { useEffect } from 'react';
import styled from 'styled-components';
import useContextExample1Reducer from './ContextExample1.store';

const StyledContextExample1 = styled.div`
  color: black;
`;

export function ContextExample1() {
  const { state, dispatch } = useContextExample1Reducer();

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
    <StyledContextExample1>
      <h1>Welcome to ContextExample1!</h1>
      <StateView />
    </StyledContextExample1>
  );
}

function StateView(): JSX.Element {
  const { state } = useContextExample1Reducer();

  return (
    <>
      <div style={{ backgroundColor: 'lightpink' }}>{JSON.stringify(state.users)}</div>
      <div style={{ backgroundColor: 'aqua' }}>{JSON.stringify(state.posts)}</div>
      <div style={{ backgroundColor: 'lightgreen' }}>{JSON.stringify(state.comments)}</div>
      <div style={{ backgroundColor: 'lightblue' }}>{JSON.stringify(state.todos)}</div>
    </>
  );
}

export default ContextExample1;
