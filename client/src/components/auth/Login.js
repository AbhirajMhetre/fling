import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login , isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

// redirect if logged in
if(isAuthenticated){
  return <Redirect to="/dashboard" />;
}

  return (
    <Fragment>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Welcome back!</h3>
                      <form onSubmit={onSubmit}>
                        <div className="form-label-group">
                          <input value={email} name="email" onChange={onChange} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                          <label htmlFor="inputEmail">Email address</label>
                        </div>
                        <div className="form-label-group">
                          <input name="password" value={password} onChange={onChange} minLength="6" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                          <label htmlFor="inputPassword">Password</label>
                        </div>
                        <p className="my-1">
                          Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect( mapStateToProps, { login })(Login);