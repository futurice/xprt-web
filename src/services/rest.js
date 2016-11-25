import "isomorphic-fetch";
import reduxApi, { transformers } from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import { createReducer } from 'redux-immutablejs'
import { fromJS, toJS, Iterable } from 'immutable';

const apiRoot = 'http://localhost:3888';

const rest = reduxApi({
  // simple edpoint description
  lectures: {
    url: `${apiRoot}/lectures`,
    transformer: transformers.array
  }
}).use("fetch", adapterFetch(fetch)); // it's necessary to point using REST backend

export default rest;

export const restReducer = (state = fromJS({}), action) => {
  // TODO: this has a pretty bad performance penalty
  state = state.toJS();

  Object.keys(rest.reducers).forEach((key) => {
    const oldState = state[key];
    const newState = rest.reducers[key](oldState, action);
    state[key] = newState;
  });

  return fromJS(state);
};
////export const restReducer = createReducer({
//'@@redux-api@lectures': (state) => console.log('there')
//}, {});
