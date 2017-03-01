const createWaitForState = () => {
  let store;

  const waitForState = predicate => new Promise(resolve => {
    const unsubscribe = store.subscribe(() => {
      if (predicate(store.getState())) {
        unsubscribe();
        resolve();
      }
    });
  });

  const setStore = s => {
    store = s;
  };

  return { waitForState, setStore };
};

export default createWaitForState;
