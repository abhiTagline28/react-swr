import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { equal, ternary } from '../utils/javascript';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ternary(
      equal(process.env.NODE_ENV, 'development'),
      ternary(
        window.__REDUX_DEVTOOLS_EXTENSION__,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
        (f) => f,
      ),
      compose,
    ),
  ),
);

export default store;
