import { api } from '@/lib/api-client';
import { Post, Todo, User } from '@/types/api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledFetchExample1 = styled.div`
  color: black;
`;

/**
 * 初回画面表示時にデータを取得しに行く。
 * 前のデータを取得したら次のデータを取得する「リクエストウォーターフォール」の例。
 */
export function FetchExample1() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await api.get<User[]>('/users');
      setUsers(users);

      const userId = users[0].id;
      const { data: posts } = await api.get<Post[]>(`/users/${userId}/posts`);
      setPosts(posts);

      const postId = posts[0].id;
      const { data: comments } = await api.get<Comment[]>(`/posts/${postId}/comments`);
      setComments(comments);

      const { data: todos } = await api.get<Todo[]>(`/users/${userId}/todos`);
      setTodos(todos);
    };

    fetchData();
  }, []);

  return (
    <StyledFetchExample1>
      <h1>Welcome to FetchExample1!</h1>
      <div style={{ backgroundColor: 'lightpink' }}>{JSON.stringify(users)}</div>
      <div style={{ backgroundColor: 'aqua' }}>{JSON.stringify(posts)}</div>
      <div style={{ backgroundColor: 'lightgreen' }}>{JSON.stringify(comments)}</div>
      <div style={{ backgroundColor: 'lightblue' }}>{JSON.stringify(todos)}</div>
    </StyledFetchExample1>
  );
}

export default FetchExample1;
