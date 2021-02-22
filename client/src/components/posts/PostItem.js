import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text,imgurl, name, profilePicture, user, likes, comments, date },
  showActions
}) => (
        <div className="col-sm-4">
        <div className="post-card">
        <Link to={`/profile/${user}`}>
                <img className="post-profile-pic" src={profilePicture} alt=""/>
                <span className="post-profile-name">{name}</span>
        </Link>
        <img className="post-image" src={imgurl} alt="Post Unavailable" />
        <span className='post-date'>
                  Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </span>
        <div className="post-profile-caption">{text}</div>
        <div>
        {showActions && (
        <Fragment>
          <div className='post-btns'>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='far fa-heart' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-heart-broken' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Comments{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
             Delete{' '}
            </button>
          )}
          </div>
          </Fragment>
                )}
                </div>
        </div>    
      </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);