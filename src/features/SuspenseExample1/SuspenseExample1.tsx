import { api } from '@/lib/api-client';
import { User } from '@/types/api';
import { Suspense } from 'react';
import styled from 'styled-components';

const StyledSuspenseExample1 = styled.div`
  color: black;
`;

const getUsers = async (): Promise<User[]> => {
  const users = await api.get<User[]>('/users');
  return users.data;
};

// データをラップするリソースを作成します
// ChatGPT により生成
const createResource = <T,>(promise: Promise<T>) => {
  let status = 'pending';
  let result: T;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
      return result; // Add this line to return a value of type T
    },
  };
};

const resource = createResource(getUsers());

function UsersView() {
  const users = resource.read();

  return <div style={{ backgroundColor: 'lightpink' }}>{JSON.stringify(users)}</div>;
}

/**
 *
 * @see https://zenn.dev/y_ta/articles/4f93b83451c6f7
 * @see https://zenn.dev/takagimeow/articles/switch-from-useeffect-to-suspense
 */
export function SuspenseExample1() {
  return (
    <StyledSuspenseExample1>
      <h1>Welcome to SuspenseExample1!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UsersView></UsersView>
      </Suspense>
    </StyledSuspenseExample1>
  );
}

export default SuspenseExample1;
