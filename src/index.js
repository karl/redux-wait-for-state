const createWaitForState = () => {
  let store;

  const waitForState = predicate => new Promise(resolve => {
    if (predicate(store.getState())) {
      resolve();
      return;
    }

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
