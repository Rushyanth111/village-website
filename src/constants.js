var url;
if (process.env.NODE_ENV === "development"){
  url = "http://localhost:5000/"
}

if (process.env.NODE_ENV === "production"){
  url = "https://api.rxav.pw/village/"
}

export default url;