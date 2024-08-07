import { Post, Todo, User } from '@/types/api';
import { useEffect } from 'react';
import styled from 'styled-components';
import useFetch from './hooks/useFetch';

const StyledFetchExample3 = styled.div`
  color: black;
`;

/**
 * カスタムフックからコールバックを返して、リクエストウォーターフォールを実現する例。
 */
export function FetchExample3() {
  console.count('★★★ FetchExample3 レンダリング ★★★');

  const { data: users, error: usersError, loading: usersLoading, fetchData: fetchUsers } = useFetch<User[]>();
  const { data: posts, error: postsError, loading: postsLoading, fetchData: fetchPosts } = useFetch<Post[]>();
  const {
    data: comments,
    error: commentsError,
    loading: commentsLoading,
    fetchData: fetchComments,
  } = useFetch<Comment[]>();
  const { data: todos, error: todosError, loading: todosLoading, fetchData: fetchTodos } = useFetch<Todo[]>();

  useEffect(() => {
    fetchUsers('/users');
  }, [fetchUsers]);

  useEffect(() => {
    if (users) {
      fetchPosts(`/users/${users[0].id}/posts`);
    }
  }, [users, fetchPosts]);

  useEffect(() => {
    if (posts) {
      fetchComments(`/posts/${posts[0].id}/comments`);
    }
  }, [posts, fetchComments]);

  useEffect(() => {
    if (users) {
      fetchTodos(`/users/${users[0].id}/todos`);
    }
  }, [users, fetchTodos]);

  return (
    <StyledFetchExample3>
      <h1>Welcome to FetchExample3!</h1>
      <div style={{ backgroundColor: 'lightpink' }}>
        <div>{Boolean(usersLoading).toString()}</div>
        {JSON.stringify(users)}
      </div>
      <div style={{ backgroundColor: 'aqua' }}>
        <div>{Boolean(postsLoading).toString()}</div>
        {JSON.stringify(posts)}
      </div>
      <div style={{ backgroundColor: 'lightgreen' }}>
        <div>{Boolean(commentsLoading).toString()}</div>
        {JSON.stringify(comments)}
      </div>
      <div style={{ backgroundColor: 'lightblue' }}>
        <div>{Boolean(todosLoading).toString()}</div>
        {JSON.stringify(todos)}
      </div>
    </StyledFetchExample3>
  );
}

export default FetchExample3;
