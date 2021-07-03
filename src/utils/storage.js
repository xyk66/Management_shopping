

import store from 'store'; 

const UserKey = 'user_key'
//eslint-disable-next-line
export default {
    saveUser(user){
        // localStorage.setItem(UserKey,JSON.stringify(user));
        store.set(UserKey,user);
    },

    getUser(){
        // return JSON.parse(localStorage.getItem(UserKey)) || '{}';
        return store.get(UserKey) || {};
    },

    removeUser(){
        // localStorage.removeItem(UserKey);
        store.remove(UserKey);
    }

}
