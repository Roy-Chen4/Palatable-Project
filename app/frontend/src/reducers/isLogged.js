const isLoggedReducer = (state = false, action) => {
    switch (action.type) {
      case 'LOGIN':
        return !state;
      case 'REGISTER':
        return !state;
      case 'LOGOUT':
        return !state;
    }
}

export default isLoggedReducer;
  