export const registerUser = (userData, history) => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err => {
      console.log(err);
      //set error state
    });
};
