function setScheme(schemeValue) {
  return {
    type: "SET_SCHEME",
    value: schemeValue,
  };
}
function setSchemeSelected(isSchemeSelected) {
  return {
    type: "SET_IS_SCHEME_SELECTED",
    value: isSchemeSelected,
  };
}

function setSearchKeyword(searchKeyword) {
  return {
    type: "SET_SEARCH_KEYWORD",
    value: searchKeyword,
  };
}

function setGeography(geophraphy) {
  return {
    type: "SET_GEO",
    value: geophraphy,
  };
}

function setMenuBar(val) {
  return {
    type: "SET_MENU",
    value: val,
  };
}

export {
  setScheme,
  setSchemeSelected,
  setSearchKeyword,
  setGeography,
  setMenuBar,
};
