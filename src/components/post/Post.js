import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import Moment from 'react-moment';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <Link to='/posts' className='btn'>
          Back To Posts
        </Link>
        <div className="row">
          <div className="singlePost col-md-6">
            <div className="post-card ">
              <Link to={`/profile/${post.user}`}>
                      <img className="post-profile-pic" src={post.profilePicture} alt=""/>
                      <span className="post-profile-name">{post.name}</span>
              </Link>
              <img className="post-image" src={post.imgurl} alt="Post Unavailable" />
              <span className='post-date'>
                        Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>
                </span>
              <div className="post-profile-caption">{post.text}</div>
            </div>
          </div>
          {/* <PostItem post={post} showActions={false} /> */}
          <div className="col-md-6">
            <CommentForm postId={post._id} />
            <div className='comments'>
              {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);