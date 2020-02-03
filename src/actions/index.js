import firebase from '../helper/fb';
import * as constants from '../constants';

export const getBlogs = () => {
  return dispatch => {
    dispatch({
      type: constants.BLOGS_FETCH_LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref('/blogs')
      .on('value', snapshot => {
        dispatch({
          type: constants.BLOGS_FETCH,
          payload: snapshot.val(),
        });
        dispatch({
          type: constants.BLOGS_FETCH_LOADING,
          payload: false,
        });
      });
  };
};

export const postBlogs = (title, content) => {
  console.log('run here');
  return dispatch => {
    // var messageListRef = firebase.database().ref('/blogs');
    // var newMessageRef = messageListRef.push();
    // newMessageRef.set({
    //   title: title,
    //   content: content,
    // });
    firebase
      .database()
      .ref('/blogs')
      .push({title, content, isComplete: false});
  };
};

export const deleteBlog = id => {
  return () => {
    firebase
      .database()
      .ref(`/blogs/${id}`)
      .remove();
  };
};

export const editBlog = (id, title, content) => {
  return () => {
    firebase
      .database()
      .ref(`/blogs/${id}`)
      .update({title: title, content: content});
  };
};

export const isComplete = (id, status) => {
  return () => {
    firebase
      .database()
      .ref(`/blogs/${id}`)
      .update({isComplete: status});
  };
};
