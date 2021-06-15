// @get
// post
export const questionApi = "http://localhost:5000/";
// @get get all user
//@post delete all user
export const userApi = questionApi + "user";
// @post increase score
// @get to remove score
// @put to give score
// user/:id
export const userScoreApi = userApi + "/";
export const intervalLimit = 3000;
