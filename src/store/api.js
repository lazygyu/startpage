import firebase from 'firebase'

let bookmarks;
let memos;


if (process.__API__) {
  bookmarks = process.__API__;
} else {

  var config = {
    apiKey: "AIzaSyBgNOlZ9s2WXnIvhLvc_LSzFpOY8iekL54",
    authDomain: "lazystartpage.firebaseapp.com",
    databaseURL: "https://lazystartpage.firebaseio.com",
    storageBucket: "lazystartpage.appspot.com",
    messagingSenderId: "550040724525"
  };

  firebase.initializeApp(config);

  const db = firebase.database();

  process.__API__ = db.ref('bookmarks');
  bookmarks = process.__API__;
  memos = db.ref('memos');
}



export { bookmarks, memos };