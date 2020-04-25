function setScheme(schemeValue) {
  return {
    type: "SET_SCHEME",
    value: schemeValue,
  };
}
function setIsSchemeSelected(isSchemeSelected) {
  return {
    type: "SET_IS_SCHEME_SELECTED",
    value: isSchemeSelected,
  };
}

export { setScheme, setIsSchemeSelected };
