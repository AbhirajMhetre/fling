import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text:'',
    imgurl:''
  });

  const{ text, imgurl} = formData;

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
		e.preventDefault();
		addPost(formData);
	};

  return (
    <div className='post-form'>
      <div className='p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => onSubmit(e)}
      >
                <input type='text' name='imgurl' value={imgurl}   onChange={e => onChange(e)}
          required placeholder='Enter a image url (upload your photo on drive, make it public and then get the link to that photo)' />
        <textarea
          name='text'
          cols='30'
          rows='3'
          placeholder='Caption of the post goes here..'
          value={text}
          onChange={e => onChange(e)}
          required
        />

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);