import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCdh8yuyuv4RJYHC8grbxkvWcI30t2WMUE',
  authDomain: 'crudproject-ca6bc.firebaseapp.com',
  databaseURL: 'https://crudproject-ca6bc.firebaseio.com',
  projectId: 'crudproject-ca6bc',
  storageBucket: 'crudproject-ca6bc.appspot.com',
  messagingSenderId: '597709717232',
  appId: '1:597709717232:web:06dcb95a85149b5e214c35',
  measurementId: 'G-PSW9QF4NZC',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
