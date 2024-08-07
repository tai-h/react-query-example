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

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);
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

      setLoading(false);
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    // loadingを見ることですべてのデータが取得されたかを確認できる。
    // loadingがfalseになったことを確認して表示用データに加工する処理を行えば無駄なレンダリングを防げる。
    console.count('データ変更検知');
    console.log({
      loading,
      users,
      posts,
      comments,
      todos,
    });
  }, [loading, users, posts, comments, todos]);

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
