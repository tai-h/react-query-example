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
      </ul>
    </StyledHome>
  );
}

export default Home;
