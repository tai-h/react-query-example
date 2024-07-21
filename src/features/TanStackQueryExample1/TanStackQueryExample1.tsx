import { api } from '@/lib/api-client';
import { Post, Todo, User } from '@/types/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

const StyledTanStackQueryExample1 = styled.div`
  color: black;
`;

export function TanStackQueryExample1() {
  const fetchUsers = async () => {
    const { data } = await api.get<User[]>('/users');
    return data;
  };

  const fetchPosts = async (userId: number | null) => {
    const { data } = await api.get<Post[]>(`/users/${userId}/posts`);
    return data;
  };

  const fetchComments = async (postId: number) => {
    const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return data;
  };

  const fetchTodos = async (userId: number) => {
    const { data } = await api.get<Todo[]>(`/users/${userId}/todos`);
    return data;
  };

  const { data: users, isLoading: usersLoading } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });

  const userId = users ? users[0].id : null;

  // 依存クエリ
  // 正しくない気がする
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPosts(userId),
    enabled: !!userId,
  });

  return (
    <StyledTanStackQueryExample1>
      <h1>Welcome to TanStackQueryExample1!</h1>
      <div style={{ backgroundColor: 'lightpink' }}>
        <div>{Boolean(usersLoading).toString()}</div>
      </div>
      <UsersView />
      <div style={{ backgroundColor: 'aqua' }}>
        <div>{Boolean(postsLoading).toString()}</div>
      </div>
    </StyledTanStackQueryExample1>
  );
}

function UsersView(): JSX.Element {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<User[]>(['users']);

  return <div style={{ backgroundColor: 'green' }}>{JSON.stringify(data)}</div>;
}

export default TanStackQueryExample1;
