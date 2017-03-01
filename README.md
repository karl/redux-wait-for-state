# Redux Wait For State

Wait for state in async thunks

```
yarn add --dev redux-wait-for-state
```

## Connecting to Redux Thunk and the store

Internally `waitForState` needs a reference to the store,
but it needs to be passed as a parameter to `thunk.withExtraArgument` when creating the store.

To get around this `createWaitForState` returns a `setStore` method that you can call once the store has been created. Behind the scenes this hooks up `waitForState` to the Redux store.

```javascript
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import createWaitForState from 'redux-wait-for-state'

const { waitForState, setStore } = createWaitForState();

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument({ waitForState }))
);

setStore(store);
```

## Using `waitForState`

```javascript

const fetchUser = (id) => async (dispatch, getState, { waitForState }) => {
  // first part of action
  await waitForState(state => state.loadingFinished === true);
  // second part of action
};
```
