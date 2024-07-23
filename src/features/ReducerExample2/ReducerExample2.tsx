import { api } from '@/lib/api-client';
import { Post, Todo, User } from '@/types/api';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';

const StyledReducerExample1 = styled.div`
  color: black;
`;

// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'SET_USERS':
//       return { ...state, users: action.payload };
//     case 'SET_POSTS':
//       return { ...state, posts: action.payload };
//     case 'SET_COMMENTS':
//       return { ...state, comments: action.payload };
//     case 'SET_TODOS':
//       return { ...state, todos: action.payload };
//     case 'SET_SELECTED_USER':
//       return { ...state, selectedUser: action.payload };
//     case 'SET_SELECTED_POSTS':
//       return { ...state, selectedPost: action.payload };
//     default:
//       return state;
//   }
// };

type UserState = {
  users: User[] | null;
  selectedUser: User | null;
};

// Initial states
const initialUserState: UserState = { users: null, selectedUser: null };

type UserAction = { type: 'SET_USERS'; payload: User[] } | { type: 'SET_SELECTED_USER'; payload: User };

const userReducer = (state: UserState = initialUserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    default:
      return state;
  }
};

type PostState = {
  posts: Post[] | null;
  selectedPost: Post | null;
};

const initialPostState: PostState = {
  posts: null,
  selectedPost: null,
};

type PostAction = { type: 'SET_POSTS'; payload: Post[] } | { type: 'SET_SELECTED_POSTS'; payload: Post };

const postReducer = (state: PostState = initialPostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_SELECTED_POSTS':
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
};

type AppState = {
  user: UserState;
  post: PostState;
};

const initialState: AppState = {
  user: initialUserState,
  post: initialPostState,
};

// ================================================================
type ReducersMapObject<S> = {
  [K in keyof S]: (state: S[K] | undefined, action: any) => S[K];
};

function combineReducers<S>(reducers: ReducersMapObject<S>) {
  return (state: S | undefined, action: any): S => {
    const newState: Partial<S> = {};
    for (const key in reducers) {
      if (Object.prototype.hasOwnProperty.call(reducers, key)) {
        const reducer = reducers[key];
        newState[key] = reducer((state as S)[key], action);
      }
    }
    return newState as S;
  };
}
// ================================================================

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  post: postReducer,
});

/**
 * reducer関数を分割して管理する例
 */
export function ReducerExample2() {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  console.log(state);

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
      if (!state.user.selectedUser) return;

      try {
        const [postsRes, todosRes] = await Promise.all([
          api.get<Post[]>(`/users/${state.user.selectedUser.id}/posts`),
          api.get<Todo[]>(`/users/${state.user.selectedUser.id}/todos`),
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
  }, [state.user.selectedUser, dispatch]);

  return (
    <StyledReducerExample1>
      <h1>Welcome to ReducerExample1!</h1>
      <div style={{ backgroundColor: 'lightpink' }}>{JSON.stringify(state.user.users)}</div>
      <div style={{ backgroundColor: 'aqua' }}>{JSON.stringify(state.post.posts)}</div>
    </StyledReducerExample1>
  );
}

export default ReducerExample2;
