import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    password: '',
    password2: ''
  });

  const { name, email, avatar, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, avatar, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
<div className="signup__container">
  <div className="container__child signup__thumbnail">
    <div className="signup__overlay" />
    <div className="thumbnail__content text-center">
      <h1 className="heading--primary">Welcome to Fling.</h1>
      <h2 className="heading--secondary">Are you ready to join the elite?</h2>
    </div>
    <div className="thumbnail__links">
      <ul className="list-inline m-b-0 text-center">
        <li><a href="" target="_blank"><i className="fa fa-globe" /></a></li>
        <li><a href="" target="_blank"><i className="fab fa-instagram"></i></a></li>
        <li><a href="" target="_blank"><i className="fab fa-facebook"></i></a></li>
        <li><a href="" target="_blank"><i className="fab fa-twitter" /></a></li>
      </ul>
    </div>
    </div>
  <div className="container__child signup__form">
    <form id="form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input name="name" value={name} onChange={onChange} className="form-control" type="text" id="username" placeholder="james.bond" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input name="email" value={email} onChange={onChange} className="form-control" type="email" id="email" placeholder="james.bond@spectre.com" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input name="password" value={password} onChange={onChange} className="form-control" type="password" id="password" placeholder="********" required />
      </div>
      <div className="form-group">
        <label htmlFor="passwordRepeat">Repeat Password</label>
        <input name="password2" value={password2} onChange={onChange} className="form-control" type="password"  id="passwordRepeat" placeholder="********" required />
      </div>
      <div className="m-t-lg">
        <ul className="list-inline">
          <li>
            <input className="btn btn--form" type="submit" defaultValue="Register" />
          </li>
          <li>
            <div className="signup__link"> Already have an account? <Link to="/login">Sign In</Link></div>
          </li>
        </ul>
      </div>
    </form>  
  </div>
</div>

    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);