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
  console.count('★★★ FetchExample1 レンダリング ★★★');

  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const { data: users } = await api.get<User[]>('/users');
      if (!ignore) setUsers(users);

      const userId = users[0].id;
      const { data: posts } = await api.get<Post[]>(`/users/${userId}/posts`);
      if (!ignore) setPosts(posts);

      const postId = posts[0].id;
      const { data: comments } = await api.get<Comment[]>(`/posts/${postId}/comments`);
      if (!ignore) setComments(comments);

      const { data: todos } = await api.get<Todo[]>(`/users/${userId}/todos`);
      if (!ignore) setTodos(todos);
    };

    fetchData();

    return () => {
      ignore = true;
    };
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
