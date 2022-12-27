import Cookies from "js-cookie";

console.log(JSON.parse(Cookies.get("user")));

export const userReducer = (
  state = Cookies.get("user") ? JSON.stringify(Cookies.get("user")) : null,
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    default:
      return state;
  }
}
