const initialState = {
  isSchemeSelected: false,
  selectedSchemeId: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SCHEME":
      return Object.assign({}, state, {
        selectedSchemeId: action.value,
      });
    case "SET_IS_SCHEME_SELECTED":
      return Object.assign({}, state, {
        isSchemeSelected: action.value,
      });
    default:
      return state;
  }
}

export default rootReducer;