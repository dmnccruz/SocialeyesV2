import React, { useEffect } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts) return 'no posts';
  if (id) posts = posts.filter((post) => post.userId === user._id);

  return (
    <div className='Posts'>
      {loading
        ? 'Fetching Posts...'
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
