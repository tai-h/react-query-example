import { Post, Todo, User } from '@/types/api';
import { useReducer } from 'react';

/** 「状態」の型定義 */
type State = {
  users: User[] | null;
  posts: Post[] | null;
  comments: Comment[] | null;
  todos: Todo[] | null;
  selectedUser: User | null;
  selectedPost: Post | null;
};

/** 「アクション」の種別定義 */
type Action =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'SET_SELECTED_USER'; payload: User }
  | { type: 'SET_SELECTED_POSTS'; payload: Post };

/** Reducer関数の定義 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    case 'SET_SELECTED_POSTS':
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
};

/** 初期状態の定義 */
const initialState: State = {
  users: null,
  posts: null,
  comments: null,
  todos: null,
  selectedUser: null,
  selectedPost: null,
};

/** createContext で使用する Context の初期値 */
const defaultContext: ReturnType<typeof useContextExample1Reducer> = {
  state: initialState,
  dispatch: () => null,
};

/** 「状態」を管理する Reducer を提供するカスタムフック */
const useContextExample1Reducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export { defaultContext };
export default useContextExample1Reducer;
