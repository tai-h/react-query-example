import { Post, Todo, User } from '@/types/api';
import styled from 'styled-components';
import useFetch from './hooks/useFetch';

const StyledFetchExample2 = styled.div`
  color: black;
`;

/**
 * カスタムフックのデータアクセスを使って、リクエストウォーターフォールを実現する例。
 */
export function FetchExample2() {
  console.count('★★★ FetchExample2 レンダリング ★★★');

  const { data: users, error: usersError, loading: usersLoading } = useFetch<User[]>('/users');

  const userId = users ? users[0].id : null;
  const {
    data: posts,
    error: postsError,
    loading: postsLoading,
  } = useFetch<Post[]>(userId ? `/users/${userId}/posts` : null);

  const postId = posts ? posts[0].id : null;
  const {
    data: comments,
    error: commentsError,
    loading: commentsLoading,
  } = useFetch<Comment[]>(postId ? `/posts/${postId}/comments` : null);

  const {
    data: todos,
    error: todosError,
    loading: todosLoading,
  } = useFetch<Todo[]>(userId ? `/users/${userId}/todos` : null);

  return (
    <StyledFetchExample2>
      <h1>Welcome to FetchExample2!</h1>
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
    </StyledFetchExample2>
  );
}

export default FetchExample2;
