export interface Action {
  type: string;
  payload: any;
}

const isAuthenticated = { loggedIn: false };

export function authReducer(state = isAuthenticated, Action: Action) {
  switch (Action.type) {
    case "login":
      return { ...Action.payload, loggedIn: true };
    case "logout":
      return { loggedIn: false };

    default:
      return state;
  }
}
