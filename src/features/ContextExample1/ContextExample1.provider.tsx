/**
 * @see https://qiita.com/curry__30/items/ecadc33eea5f54c0bd7a
 */

import { createContext } from 'react';
import ContextExample1 from './ContextExample1';
import useContextExample1Reducer, { defaultContextExample1Reducer } from './ContextExample1.store';

// createContextのdefaultValue
const { state, dispatch } = defaultContextExample1Reducer;

const ContextExample1Context = createContext({ state, dispatch });

export const ContextExample1Provider = (): JSX.Element => {
  // カスタムフックの返り値
  const { state, dispatch } = useContextExample1Reducer();

  return (
    <ContextExample1Context.Provider value={{ state, dispatch }}>
      <ContextExample1 />
    </ContextExample1Context.Provider>
  );
};

export default ContextExample1Provider;
