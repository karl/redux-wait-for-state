// Use Bluebird to make promises work with mock timers.
global.Promise = require('bluebird');
const createWaitForState = require('./index').default;

test('wait for state resolves when predicate returns true', () => {
  const state = {
    isValueWeWant: false,
  };

  const mock = jest.fn();
  const unsubscribeMock = jest.fn();
  const subscribeMock = jest.fn(() => unsubscribeMock);
  const getStateMock = jest.fn(() => state);
  const predicate = jest.fn(s => s.isValueWeWant);

  const STORE = {
    subscribe: subscribeMock,
    getState: getStateMock,
  };

  const { waitForState, setStore } = createWaitForState();

  setStore(STORE);
  waitForState(predicate).then(mock);

  expect(subscribeMock).toHaveBeenCalled();
  const callback = subscribeMock.mock.calls[0][0];

  callback();
  expect(predicate).toHaveBeenCalledWith(state);
  expect(unsubscribeMock).not.toHaveBeenCalled();

  state.isValueWeWant = true;

  callback();
  expect(predicate).toHaveBeenCalledWith(state);
  expect(unsubscribeMock).toHaveBeenCalled();

  jest.runAllTimers();

  expect(mock).toHaveBeenCalled();
});

test('wait for state resolves in next tick if predicate already returns true', () => {
  const state = {
    isValueWeWant: true,
  };

  const mock = jest.fn();
  const unsubscribeMock = jest.fn();
  const subscribeMock = jest.fn(() => unsubscribeMock);
  const getStateMock = jest.fn(() => state);
  const predicate = jest.fn(s => s.isValueWeWant);

  const STORE = {
    subscribe: subscribeMock,
    getState: getStateMock,
  };

  const { waitForState, setStore } = createWaitForState();

  setStore(STORE);
  waitForState(predicate).then(mock);

  expect(subscribeMock).not.toHaveBeenCalled();
  expect(predicate).toHaveBeenCalledWith(state);

  jest.runAllTimers();

  expect(mock).toHaveBeenCalled();
});
