import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StyledHome = styled.div`
  color: pink;
`;

export function Home() {
  return (
    <StyledHome>
      <h1>Welcome to Home!</h1>

      <ul>
        <li>
          <Link to="/fetch-example-1">fetch Example 1</Link>
        </li>
        <li>
          <Link to="/fetch-example-1-2">fetch Example 1_2</Link>
        </li>
        <li>
          <Link to="/fetch-example-2">fetch Example 2</Link>
        </li>
        <li>
          <Link to="/fetch-example-3">fetch Example 3</Link>
        </li>
        <li>
          <Link to="/tanstack-query-example-1">TanStack Query Example 1</Link>
        </li>
        <li>
          <Link to="/suspense-example-1">Suspense Example 1</Link>
        </li>
        <li>
          <Link to="/reducer-example-1">Reducer Example 1</Link>
        </li>
        <li>
          <Link to="/reducer-example-2">Reducer Example 2</Link>
        </li>
        <li>
          <Link to="/context-example-1">Context Example 1</Link>
        </li>
        <li>
          <Link to="/swr-example-1">Swr Example 1</Link>
        </li>
      </ul>
    </StyledHome>
  );
}

export default Home;
