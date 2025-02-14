export function localStorageReducer(reducer: any) {
    return function (state: any, action: any) {
      const newState = reducer(state, action);
      localStorage.setItem('tasks', JSON.stringify(newState.tasks));
      return newState;
    };
  }