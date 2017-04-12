import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { bookmarks, memos } from './api.js'
const provider = new firebase.auth.GoogleAuthProvider();

let auth = firebase.auth();
let collections = null, myMemos = null, commonMemos = null;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bookmarks: [],
    location: null,
    weather: null,
    currentWeather:null,
    user: null,
    colour: null,
    memo_mine: null,
    memo_common:null
  },
  actions: {
    FETCH_BOOKMARKS({ commit, dispatch, state }) {
      if (state.user) {
        
      }
    },
    TIME_CHANGED({ commit }, time) {
      
      let hue = (time.getHours() * 3600) + ((time.getMinutes() * 60)) + (time.getSeconds());
      hue /= 86400;
      hue *= 360;
      let str = `hsl(${hue},10%,50%)`;
      commit('COLOR_CHANGE', str);
      
    },
    ADD_MEMO({ commit }, { type, memo }) {
      if (type == 0) {
        myMemos.push(memo);
      } else if (type == 1) {
        commonMemos.push(memo);
      }
    },
    HIT({ commit, dispatch, state }, item) {
      let k = item.key + '/hit';
      let updates = {};
      updates[k] = item.hit + 1;
      collections.update(updates);
    },
    SET_LOCATION({ commit, dispatch, state }, loc) {
      commit('SET_LOCATION', loc);
      getWeatherSummary();
      getWeather();
    },
    SET_WEATHER({ commit, dispatch, state }, weather) {
      commit('SET_WEATHER', weather);
    },
    SET_CURRENT_WEATHER({ commit, dispatch }, wh) {
      commit('SET_CURRENT_WEATHER', wh);
    },
    REMOVE_MEMO({ commit }, { type, key }) {
      
      if (type == 0) {
        myMemos.child(key).remove();
      } else if (type == 1) {
        commonMemos.child(key).remove();
      }
    },
    USER_LOGGED_IN({ commit, dispatch, state }, user) {
      commit('USER_SET', user);
      collections = bookmarks.child(user.uid);
      collections.off();
      collections.on('value', (data) => { 
        let arr = [];
        let vals = data.val();
        for (let i in vals) {
          arr.push(Object.assign({key:i}, vals[i]));
        }
        arr.sort((a, b) => { return b.hit - a.hit; });
        store.commit('BOOKMARK_SET', arr);
      });
      myMemos = memos.child(user.uid);
      commonMemos = memos.child('common');
      myMemos.off();
      commonMemos.off();
      myMemos.on('value', data => { 
        let arr = [];
        let vals = data.val();
        for (let i in vals) {
          arr.push(Object.assign({ key: i }, vals[i]));
        }
        store.commit('MY_MEMO_SET', arr);
      });
      commonMemos.on('value', data => { 
        let arr = [];
        let vals = data.val();
        for (let i in vals) {
          arr.push(Object.assign({ key: i }, vals[i]));
        }
        store.commit('COMMON_MEMO_SET', arr);
      });
      getLocation();
    },
    USER_LOGGED_OUT({ commit, dispatch, state }) {
      commit('USER_SET', null);
      collections = null;
      myMemos = null;
    },
    SIGN_OUT({ commit, dispatch }) {
      auth.signOut().then(() => { 
        dispatch('USER_LOGGED_OUT');
      }, err=>console.error.bind(console));
    },
    ADD_ITEM({ commit, dispatch }, item) {
      collections.push(Object.assign(item, {user:auth.currentUser.uid}));
    },
    REMOVE_ITEM({ }, item) {
      collections.child(item.key).remove();
    },
    SIGN_IN({ state, commit, dispatch }) {
      if (state.user === null) {
        auth.getRedirectResult().then((res) => {
          if (res.credential) {
            commit('USER_SET', Object.assign({ token: result.credential.accessToken, refreshToken: result.credential.refreshToken }, result.user));
          } else {
            auth.signInWithRedirect(provider);
          }
         });
      }
    }
  },
  mutations: {
    MY_MEMO_ADDED(state, memo) {
      state.memo_mine.push(memo);
    },
    COMMON_MEMO_ADD(state, memo) {
      state.memo_common.push(memo);
    },
    MY_MEMO_SET(state, memolist) {
      state.memo_mine = memolist;
    },
    COMMON_MEMO_SET(state, memolist) {
      state.memo_common = memolist;
    },
    COLOR_CHANGE(state, str) {
      state.colour = str;
    },
    SET_WEATHER(state, wh) {
      state.weather = wh;
    },
    SET_CURRENT_WEATHER(state, wh) {
      state.currentWeather = wh.weather.hourly[0];
    },
    SET_LOCATION(state, loc) {
      state.location = loc;
    },
    USER_SET(state, user) {
      state.user = user;
    },
    BOOKMARK_SET(state, bookmarks) {
      state.bookmarks = bookmarks;
    },
    BOOKMARK_MOD(state, type, data) {
      switch (type) {
        case "ADD":
          state.bookmarks.push(data);
          break;
        case "REMOVE":
          state.bookmarks.splice(state.bookmarks.findIndex(bm => bm.key === data.key), 1);
          break;
        case "CHANGE":
          break;
      }
    }
  }
});


auth.onAuthStateChanged((user) => { 
  if (user) {
    store.dispatch("USER_LOGGED_IN", user);
    
  } else {
    store.dispatch("USER_LOGGED_OUT");
  }
});


function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => { 
      store.dispatch("SET_LOCATION", pos.coords);
    });
  }
}

function getWeather() {
  if (store.state.location) {
    
    fetch(`/weather/current/${store.state.location.latitude}/${store.state.location.longitude}`)
      .then(resp => resp.json())
      .then(dat => { 
        store.dispatch('SET_CURRENT_WEATHER', dat);
      });
  }
  setTimeout(getWeather, 1000 * 60 * 60);
}

function getWeatherSummary() {
  if (store.state.location) {
    
    fetch(`/weather/summary/${store.state.location.latitude}/${store.state.location.longitude}`)
      .then(resp=>resp.json())  
      .then((dat) => { 
        store.dispatch('SET_WEATHER', dat);
      });
  }
}




export default store;