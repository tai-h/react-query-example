/**
 * @see https://qiita.com/curry__30/items/ecadc33eea5f54c0bd7a
 */

import { createContext, useContext } from 'react';
import ContextExample1 from './ContextExample1';
import useContextExample1Reducer, { defaultContext } from './ContextExample1.store';

/** Reducer が保持する「状態」で初期化された Context */
const ContextExample1Context = createContext(defaultContext);

/** 「Context」を提供するカスタムフック */
export const useContextExample1Context = () => useContext(ContextExample1Context);

/** 「Reducer」を提供する Provider */
export const ContextExample1Provider = (): JSX.Element => {
  const { state, dispatch } = useContextExample1Reducer();

  return (
    <ContextExample1Context.Provider value={{ state, dispatch }}>
      <ContextExample1 />
    </ContextExample1Context.Provider>
  );
};

export default ContextExample1Provider;
