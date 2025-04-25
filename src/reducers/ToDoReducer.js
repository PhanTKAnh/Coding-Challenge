export const todoReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.value,
          status: "incomplete"
        }
      ];

    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);

    case "SET_ALL":
      return action.payload;
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, title: action.newTitle }
          : todo
      );
    default:
      return state;
  }
};
