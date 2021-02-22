import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    OneCouple:{CompatibilityPercentage},
    OneProfile:{
                user: { _id, name},
                profilePicture,
                location,
                bio
              }
  }
}) => {

  return (
    <div className='profile bg-light'>
      <img src={profilePicture} alt='' className='round-img profiles-list-img' />
      <div className="profile-data">
        <h2>{name}</h2>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <div>{bio}</div>
        <div></div>
        <Link to={`/profile/${_id}`} className='btn btn-primary view-profiles-btn'>
          View Profile
        </Link>
      </div>
      <div className="flex-wrapper">
          <div className="single-chart">
            <svg viewBox="0 0 36 36" className="circular-chart orange">
              <path className="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${CompatibilityPercentage}, 100`} d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x={18} y="20.35" className="percentage">{CompatibilityPercentage.toFixed(2)}{" %"}</text>
            </svg>
          </div>
        </div>

    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;