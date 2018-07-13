interface Action {
  type: string;
}

interface Map<T> {
  [key: string]: T;
}

function createReducer<S, T extends Action>(initialState: S, handlers: Map<Function>) {
  return (state: S = initialState, action: T) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export default {
  createReducer
};
