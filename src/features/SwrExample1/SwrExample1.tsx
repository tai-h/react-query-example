import { api } from '@/lib/api-client';
import { Post, Todo, User } from '@/types/api';
import styled from 'styled-components';
import useSWR from 'swr';

const StyledSwrExample1 = styled.div`
  color: black;
`;

const fetchUsers = async () => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

const fetchPosts = async (userId: number | null) => {
  const { data } = await api.get<Post[]>(`/users/${userId}/posts`);
  return data;
};

const fetchComments = async (postId: number | null) => {
  const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return data;
};

const fetchTodos = async (userId: number | null) => {
  const { data } = await api.get<Todo[]>(`/users/${userId}/todos`);
  return data;
};

export function SwrExample1() {
  console.count('★★★ SwrExample1 レンダリング ★★★');

  // ユーザー情報の要求
  const { data: users } = useSWR('/user', fetchUsers);
  const userId = users && users.length > 0 ? users[0].id : null;

  // ユーザーの投稿情報の要求
  const { data: posts } = useSWR(userId ? `/users/${userId}/posts` : null, () => fetchPosts(userId));
  const postId = posts && posts.length > 0 ? posts[0].id : null;

  // コメント情報の取得
  const { data: comments } = useSWR(postId ? `/posts/${postId}/comments` : null, () => fetchComments(postId));

  // TODO情報の取得
  const { data: todos } = useSWR(userId ? `/users/${userId}/todos` : null, () => fetchTodos(userId));

  return (
    <StyledSwrExample1>
      <h1>Welcome to SwrExample1!</h1>
      <div style={{ backgroundColor: 'lightpink' }}>{JSON.stringify(users)}</div>
      <div style={{ backgroundColor: 'aqua' }}>{JSON.stringify(posts)}</div>
      <div style={{ backgroundColor: 'lightgreen' }}>{JSON.stringify(comments)}</div>
      <div style={{ backgroundColor: 'lightblue' }}>{JSON.stringify(todos)}</div>
    </StyledSwrExample1>
  );
}

export default SwrExample1;
