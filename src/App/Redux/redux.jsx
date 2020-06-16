const initialState = {
  isSchemeSelected: false,
  selectedSchemeId: 0,
  searchKeyword: "",
  geography: "Karnataka",
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
    case "SET_SEARCH_KEYWORD":
      return Object.assign({}, state, {
        searchKeyword: action.value,
      });
    case "SET_GEO":
      return Object.assign({}, state, {
        geography: action.value,
      });
    default:
      return state;
  }
}

export default rootReducer;
