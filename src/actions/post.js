import axios from 'axios';
import { Result } from 'express-validator';
import { set } from 'mongoose';
import { setAlert } from './alert';
import {
  DELETE_POST,
  GET_POSTS,
  GET_PROFILE,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_PROFILE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

//GET Posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'https://blooming-citadel-59420.herokuapp.com/api/posts'
    );

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://blooming-citadel-59420.herokuapp.com/api/posts/like//${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove Like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://blooming-citadel-59420.herokuapp.com/api/posts/unlike/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(
      `https://blooming-citadel-59420.herokuapp.com/api/posts/${postId}`
    );

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Post
export const addPost = (FormData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `https://blooming-citadel-59420.herokuapp.com/api/posts`,
      FormData,
      config
    );

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET Post

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://blooming-citadel-59420.herokuapp.com/api/posts/${id}`
    );

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Comment
export const addComment = (postId, FormData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `https://blooming-citadel-59420.herokuapp.com/api/posts/comment/${postId}`,
      FormData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(
      `https://blooming-citadel-59420.herokuapp.com/api/posts/comment/${postId}/${commentId}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
