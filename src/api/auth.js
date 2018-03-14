// import {postByForm, post} from '../utils/fetch'

export function login() {
  return new Promise(resolve => {
    resolve({ userId: 1, userName: "admin" });
  });
}

export function logout() {
  return new Promise(resolve => {
    resolve({ userId: 1, userName: "admin" });
  });
}
