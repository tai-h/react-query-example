import { api } from '@/lib/api-client';
import { Post, Todo, User } from '@/types/api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledFetchExample = styled.div`
  color: black;
`;

/**
 * Promise.all を使う例
 */
export function FetchExample1_2() {
  console.count('★★★ FetchExample1_2 レンダリング ★★★');

  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await api.get<User[]>('/users');
      setUsers(users);

      const [postsRes, todosRes] = await Promise.all([
        api.get<Post[]>(`/users/${users[0].id}/posts`),
        api.get<Todo[]>(`/users/${users[0].id}/todos`),
      ]);

      setPosts(postsRes.data);
      setTodos(todosRes.data);

      const postId = postsRes.data[0].id;
      const { data: comments } = await api.get<Comment[]>(`/posts/${postId}/comments`);
      setComments(comments);
    };

    fetchData();
  }, []);

  return (
    <StyledFetchExample>
      <h1>Welcome to FetchExample1-2!</h1>
      <div style={{ backgroundColor: 'lightpink' }}>{JSON.stringify(users)}</div>
      <div style={{ backgroundColor: 'aqua' }}>{JSON.stringify(posts)}</div>
      <div style={{ backgroundColor: 'lightgreen' }}>{JSON.stringify(comments)}</div>
      <div style={{ backgroundColor: 'lightblue' }}>{JSON.stringify(todos)}</div>
    </StyledFetchExample>
  );
}

export default FetchExample1_2;
