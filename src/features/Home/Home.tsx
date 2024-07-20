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
          <Link to="/fetch-example-1_2">fetch Example 1_2</Link>
        </li>
        <li>
          <Link to="/fetch-example-2">fetch Example 2</Link>
        </li>
        <li>
          <Link to="/fetch-example-3">fetch Example 3</Link>
        </li>
      </ul>
    </StyledHome>
  );
}

export default Home;
