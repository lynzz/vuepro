import { login, logout } from "../../api/auth";
import store from "@/utils/store";

let userInfo = store.get("userInfo");
const user = {
  state: {
    username: userInfo ? userInfo.username : ""
  },

  mutations: {
    setUserName(state, name) {
      state.username = name;
    }
  },

  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(data => {
            store.set("userInfo", data);
            store.set("unloginCount", 0);
            commit("setUserName", data.username);
            resolve();
          })
          .catch(reason => reject(reason));
      });
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            store.clear();
            commit("setUserName", "");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
