import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    profilePicture: '',
    coverPhoto: '',
    genderInterestedIn: '',
    college: '',
    age:'',
    caste:'',
    fieldOfStudy: '',
    favoritesitecom: '',
    favoriteseries: '',
    height: '',
    virginity: '',
    dogOrCat: '',
    whatVert: '',
    politics: '',
    religion: '',
    drinker: '',
    smoker: '',
    cooking: '',
    poessesive: '',
    chatOrCall: '',
    reading: '',
    travel: '',
    spendNight: '',
    location: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      profilePicture: loading || !profile.profilePicture ? '' : profile.profilePicture,
      coverPhoto: loading || !profile.coverPhoto ? '' : profile.coverPhoto,
      genderInterestedIn: loading || !profile.genderInterestedIn ? '' : profile.genderInterestedIn,
      age: loading || !profile.age ? '' : profile.age,
      caste: loading || !profile.caste ? '' : profile.caste,
      college: loading || !profile.college ? '' : profile.college,
      fieldOfStudy: loading || !profile.fieldOfStudy ? '' : profile.fieldOfStudy,
      favoritesitecom: loading || !profile.favoritesitecom ? '' : profile.favoritesitecom,
      favoriteseries: loading || !profile.favoriteseries ? '' : profile.favoriteseries,
      height: loading || !profile.height ? '' : profile.height,
      virginity: loading || !profile.virginity ? '' : profile.virginity,
      dogOrCat: loading || !profile.dogOrCat ? '' : profile.dogOrCat,
      whatVert: loading || !profile.whatVert ? '' : profile.whatVert,
      politics: loading || !profile.politics ? '' : profile.politics,
      religion: loading || !profile.religion ? '' : profile.religion,
      drinker: loading || !profile.drinker ? '' : profile.drinker,
      smoker: loading || !profile.smoker ? '' : profile.smoker,
      cooking: loading || !profile.cooking ? '' : profile.cooking,
      poessesive: loading || !profile.poessesive ? '' : profile.poessesive,
      chatOrCall: loading || !profile.chatOrCall ? '' : profile.chatOrCall,
      reading: loading || !profile.reading ? '' : profile.reading,
      travel: loading || !profile.travel ? '' : profile.travel,
      spendNight: loading || !profile.spendNight ? '' : profile.spendNight,
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  const {
    profilePicture,
    coverPhoto,
    genderInterestedIn,
    age,
    caste,
    college,
    fieldOfStudy,
    favoritesitecom,
    favoriteseries,
    height,
    virginity,
    dogOrCat,
    whatVert,
    politics,
    religion,
    drinker,
    smoker,
    cooking,
    poessesive,
    chatOrCall,
    reading,
    travel,
    spendNight,
    location,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
 
  return (
    <Fragment>
    {profile === null || loading ? (
      <Spinner />
    ) : (
    <Fragment> 
      <div className="container">
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Refresh page if earlier profile not visible
      </p>
      <small>required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>

      <div className='form-group'>
          <input
            type='text'
            placeholder='URL for Profile Picture'
            name='profilePicture'
            value={profilePicture}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Open instagram on browser, right click on your DP and paste the image address here or any other URL if you want.
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='URL for Cover picture like the facebook has'
            name='coverPhoto'
            value={coverPhoto}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Landscape sized photo are preferred.
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="genderInterestedIn">Select Gender you are attracted to</label>
          <select name='genderInterestedIn' value={genderInterestedIn} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Bisexual'>Bisexual</option>
            <option value='Asexual'>Asexual</option>
          </select>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='age'
            name='age'
            value={age}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Enter your age, Dont lie
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Hindu, Maratha'
            name='caste'
            value={caste}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Just helping you avoid future problems.Don't write atheist to be cool, same caste people have high chance
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='College'
            name='college'
            value={college}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Relationships are easy when in same college
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="fieldOfStudy">Select your field of study</label>
          <select name='fieldOfStudy' value={fieldOfStudy} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Engineering'>Engineering</option>
            <option value='Commerce'>Commerce</option>
            <option value='Arts'>Arts</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <div className='form-group'>
        <label htmlFor="favoritesitecom">* Select the best sitecom according to you:</label>
          <select name='favoritesitecom' value={favoritesitecom} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='The Office'>The Office</option>
            <option value='Friends'>Friends</option>
            <option value='The Big Bang theory'>The Big Bang theory</option>
            <option value='How I met your mother'>How I met your mother</option>
            <option value='Brokyln 99'>Brokyln 99</option>
            <option value='Has not watched many sitcoms'>Haven't watched any of those</option>
          </select>
        </div>

        <div className='form-group'>
        <option htmlFor="favoriteseries">Select the best series according to you:</option>
          <select name='favoriteseries' value={favoriteseries} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Breaking Bad'>Breaking Bad</option>
            <option value='Sherlock Holmes'>Sherlock Holmes</option>
            <option value='Death Note'>Death Note</option>
            <option value='Some not so famous series'>Other</option>
          </select>
        </div>

        <div className='form-group'>
        <label htmlFor="virginity">So what's your status on sex:</label>
          <select name='virginity' value={virginity} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Virgin'>Virgin</option>
            <option value='Not a virgin'>Yes, I have had sex before</option>
            <option value='He/she should accept me irrespective of my virginity'>I think it should'nt matter</option>
          </select>
          <small className='form-text'>
            You can have all the opinion you have, but if it doesn't match with the next person it isn't helping
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="dogOrCat">Are you a Dog person or a cat person:</label>
          <select name='dogOrCat' value={dogOrCat} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Dog person'>Ofcourse Dogs!</option>
            <option value='Cat person'>Always cats!</option>
            <option value='Loves all kinds of animals'>I love all kinds of animals</option>
          </select>
        </div>

        <div className='form-group'>
        <label htmlFor="whatVert">Introvert or Extrovert:</label>
          <select name='whatVert' value={whatVert} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Introvert'>Introvert</option>
            <option value='Extrovert'>Extrovert</option>
            <option value='Ambivert'>Ambivert</option>
          </select>
          <small className='form-text'>
            I'm assuming introverts will go better with extroverts and vice versa, so avoid choosing ambivert.
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="politics">Do you follow politics:</label>
          <select name='politics' value={politics} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Doesnt care about politics'>Don't care</option>
            <option value='Give decent attention to politics'>A little</option>
            <option value='Follows politics'>Yes</option>
          </select>
        </div>

        <div className='form-group'>
        <label htmlFor="religion">How religious are you:</label>
          <select name='religion' value={religion} onChange={e => onChange(e)}>
          <option value='none'></option>
          <option value='Atheist'>Atheist</option>
            <option value='Do not believe in religious practices, but God does exist'>Do not believe in religious practices, but God does exist</option>
            <option value='Religious'>Yes, I belive in my relegion.</option>
          </select>
        </div>


        <div className='form-group'>
        <label htmlFor="drinker">How often do you drink:</label>
          <select name='drinker' value={drinker} onChange={e => onChange(e)}>
          <option value="none"></option>
            <option value='Less than thrice till now'>Less than thrice till now</option>
            <option value='Occasionally'>Occasionally</option>
            <option value='More than once a month'>More than once a month</option>
          </select>
          <small className='form-text'>
           You don't want your partner to finish all your chakna, being on same page is better.
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="smoker">How often do you smoke:</label>
          <select name='smoker' value={smoker} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Never tried smoking'>Never tried</option>
            <option value='Tried once'>Tried once</option>
            <option value='Trying to Quit'>Trying to Quit</option>
          </select>
          <small className='form-text'>
          Those who chose Trying to quit, Kahase laate ho itna depression?!
          </small>
        </div>

        <div className='form-group'>
        <label>Can you make gol rotis:</label>
          <select name='cooking' value={cooking} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Great cook'>Yes</option>
            <option value='Maggie achi bana leta/leyi hu'>Maggie achi bana leta/leti hu</option>
          </select>
          <small className='form-text'>
           Who doesn't wants a delicious feast ready at home before they get home
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="poessesive">How poessesive are you based on your past relations:</label>
          <select name='poessesive' value={poessesive} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Quite poessesive'>Very much</option>
            <option value='Poessesive in a decent amount'>Just in normal amount</option>
            <option value='Not at all poessesive'>I trust in my partner</option>
          </select>
          <small className='form-text'>
           Both being poessesive might create lesser problems I guess.
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="chatOrCall">What would you prefer:</label>
          <select name='chatOrCall' value={chatOrCall} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Call person'>Night call</option>
            <option value='Chat person'>Night chat</option>
            <option value='Both chatting or calling is cool'>Anything is fine</option>
          </select>
          <small className='form-text'>
           Jo bhi gharwale allow kare
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="reading">Do you read books:</label>
          <select name='reading' value={reading} onChange={e => onChange(e)}>
            <option></option>
            <option value='Bookworm'>Yes, I'm a bookworm</option>
            <option value='Has read a few books'>Yes a few, But not much into reading</option>
            <option value='Not into books'>No, nind aati hai</option>
          </select>
          <small className='form-text'>
           Padha karo besharmo, Fifty shades k alava bhi kuch padha karo
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="travel">Ideal holiday destination:</label>
          <select name='travel' value={travel} onChange={e => onChange(e)}>
            <option value="none"></option>
            <option value='Trekking in Himalaya'>Trekking in Himalaya</option>
            <option value='Chilling at Beach'>Chilling at Beach</option>
            <option value='Sit home and relax'>Sit home and relax</option>
          </select>
          <small className='form-text'>
           
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="reading">Would like a date and:</label>
          <select name='spendNight' value={spendNight} onChange={e => onChange(e)}>
            <option></option>
            <option value='Party night at clubs'>Party at clubs</option>
            <option value='Movie night at my comfy couch'>Movie night at my comfy couch</option>
          </select>
          <small className='form-text'>
           
          </small>
        </div>



        

        <div className='form-group'>
        <label htmlFor="height">Enter your height</label>
          <input
            type='number'
            placeholder='Your height in centimetres'
            name='height'
            value={height}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Size does matter
          </small>
        </div>

  


        <div className='form-group'>
        <label htmlFor="location">Where do you live:</label>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Might find a soulmate nearby (eg. Kothrud, Pune)
          </small>
        </div>

        <div className='form-group'>
        <label htmlFor="reading">What goes in your Bio:</label>
          <textarea
            placeholder='If you can’t handle my quarantine hair, you don’t deserve me when this is all over'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Google tinder bios for better ideas</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
      </div>
    </Fragment>
    )}
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));