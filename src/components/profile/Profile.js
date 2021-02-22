import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import './profile.css';

const Profile = ({
  getProfileById,
  profile: { profile , loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);


  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
      <div>
    <div className="main-content">
      {/* Top navbar */}
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/profiles">
            Back To Profiles
          </Link>
          {/* User */}
          <ul className="navbar-nav align-items-center d-none d-md-flex">
          <div className="Social-media">
            <a href={profile.profile.social.facebook}><i className="fab fa-facebook"></i></a>
            <a href={profile.profile.social.twitter}><i className="fab fa-twitter"></i></a>
            <a href={profile.profile.social.linkedin}><i className="fab fa-linkedin"></i></a>
            <a href={profile.profile.social.instagram}><i className="fab fa-instagram"></i></a>
            <a href={profile.profile.social.youtube}><i className="fab fa-youtube"></i></a>
          </div>
            <li className="nav-item dropdown">
              <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="media align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src={profile.profile.profilePicture} />
                  </span>
                  <div className="media-body ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm  font-weight-bold">{}</span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                <div className=" dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#!" className="dropdown-item">
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* Header */}
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: 600, backgroundImage: `url(${profile.profile.coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <div className="container-fluid d-flex align-items-center">
          <div className="row" style={{width:'100%'}}>
            <div className="col-lg-7 col-md-10">          
              <h1 className="display-2 text-white">{profile.profile.user.name.split(" ")[0]}{", "}{profile.profile.age}</h1>
              <p className="text-white mt-0 mb-5">{profile.profile.bio}</p>
             
                {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.profile.user._id && (
              <Link to='/edit-profile' className="btn btn-info" id="edit-btn">
                Edit Profile
              </Link>
            )}
            </div>
          </div>
        </div>
      </div>
      {/* Page content */}
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <a href="#">
                      <img src={profile.profile.profilePicture} className="rounded-circle" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <a href="#" className="btn btn-sm btn-info mr-4">Fling</a>
                  <a href="#" className="btn btn-sm btn-default float-right">Message</a>
                </div>
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="row">
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{profile.Couple.CompatibilityPercentage.toFixed(2)}{" %"}</span>
                        <span className="description">Compatible</span>
                      </div>
                      <div>
                        <span className="heading">1</span>
                        <span className="description">Past Relations</span>
                      </div>
                      <div>
                        <span className="heading">9</span>
                        <span className="description">Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3>
                    {profile.profile.user.name}<span className="font-weight-light">, {profile.profile.age}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />{profile.profile.location}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />{profile.profile.college}, {profile.profile.fieldOfStudy}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                  </div>
                  <div className="Social-media" id="right-social-media">
                    <a href={profile.profile.social.facebook}><i className="fab fa-facebook"></i></a>
                    <a href={profile.profile.social.twitter}><i className="fab fa-twitter"></i></a>
                    <a href={profile.profile.social.linkedin}><i className="fab fa-linkedin"></i></a>
                    <a href={profile.profile.social.instagram}><i className="fab fa-instagram"></i></a>
                    <a href={profile.profile.social.youtube}><i className="fab fa-youtube"></i></a>
                  </div>
                  <hr className="my-4" />
                  <p>{profile.profile.bio}</p>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">Account Details</h3>
                  </div>
                  <div className="col-4 text-right">
                    {/* <a href="#!" className="btn btn-sm btn-primary"></a> */}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-first-name">Full name</label>
                          <div className="form-control form-control-alternative">
                            {profile.profile.user.name}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-username">Gender Interested In</label>
                          <div  className="form-control form-control-alternative">
                            {profile.profile.genderInterestedIn}
                            </div>
                        </div>
                      </div>
                      
                    </div>

                    <div className="row">

                    <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-email">Current Age</label>
                          <div className="form-control form-control-alternative">
                            {profile.profile.age}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-last-name">Religion and caste</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.caste}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
               
                  <h6 className="heading-small text-muted mb-4">Know them more</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group focused">
                          <label className="form-control-label">Favorite Sit-com</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.favoritesitecom}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group focused">
                          <label className="form-control-label">Favorite Drama series</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.favoriteseries}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                          <div className="form-group focused">
                            <label className="form-control-label">Cat Person or Dog Person</label>
                            <div className="form-control form-control-alternative">
                            {profile.profile.dogOrCat}
                            </div>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="form-group focused">
                            <label className="form-control-label">Can Cook</label>
                            <div className="form-control form-control-alternative">
                            {profile.profile.cooking}
                            </div>
                          </div>
                      </div>
                      
                    </div>
                  </div>
                  <hr className="my-4" />
                  
                  <h6 className="heading-small text-muted mb-4">Some Physical aspects</h6>
                  <div className="row">
                      <div className="col-md-6">
                              <div className="form-group focused">
                                <label className="form-control-label">Virginity Status</label>
                                <div className="form-control form-control-alternative">
                                {profile.profile.virginity}
                                </div>
                              </div>
                       </div>

                       <div className="col-md-6">
                              <div className="form-group focused">
                                <label className="form-control-label">Height</label>
                                <div className="form-control form-control-alternative">
                                {profile.profile.height}{" "}cms
                                </div>
                              </div>
                       </div>

                       <div className="col-md-6">
                              <div className="form-group focused">
                                <label className="form-control-label">How often does {profile.profile.user.name.split(" ")[0]} drink:</label>
                                <div className="form-control form-control-alternative">
                                {profile.profile.drinker}
                                </div>
                              </div>
                       </div>

                       <div className="col-md-6">
                              <div className="form-group focused">
                                <label className="form-control-label">How often does {profile.profile.user.name.split(" ")[0]} smoke:</label>
                                <div className="form-control form-control-alternative">
                                {profile.profile.smoker}
                                </div>
                              </div>
                       </div>

                       <div className="col-md-6">
                              <div className="form-group focused">
                                <label className="form-control-label">Where does {profile.profile.user.name.split(" ")[0]} stand on poessesiveness</label>
                                <div className="form-control form-control-alternative">
                                {profile.profile.poessesive}
                                </div>
                              </div>
                       </div>

                  </div>


                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">How would {profile.profile.user.name.trim().split(' ')[0]} like to spend time:</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group focused">
                          <label className="form-control-label">Spending a night:</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.spendNight}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group focused">
                          <label className="form-control-label">Mountains or Beaches</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.travel}
                          </div>
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div className="form-group focused">
                          <label className="form-control-label">Reading habits:</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.reading}
                          </div>
                        </div>
                      </div>


                    </div>
                    
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Know them more...</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group focused">
                          <label className="form-control-label">How much into politics is {profile.profile.user.name.split(" ")[0]}:</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.politics}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group focused">
                          <label className="form-control-label">Does {profile.profile.user.name.split(" ")[0]} believe in religion</label>
                          <div className="form-control form-control-alternative">
                          {profile.profile.religion}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                          <div className="form-group focused">
                            <label className="form-control-label">Introvert or Extrovert</label>
                            <div className="form-control form-control-alternative">
                            {profile.profile.whatVert}
                            </div>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="form-group focused">
                            <label className="form-control-label">Does {profile.profile.user.name.split(" ")[0]} prefer chat or call:</label>
                            <div className="form-control form-control-alternative">
                            {profile.profile.chatOrCall}
                            </div>
                          </div>
                      </div>
                      
                    </div>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer">
      <div className="row align-items-center justify-content-xl-between">
        <div className="col-xl-6 m-auto text-center">
          <div className="copyright">
            <p>Made with <i className="fas fa-heart"></i> by Abhiraj Mhetre</p>
          </div>
        </div>
      </div>
    </footer>
  </div>


        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);