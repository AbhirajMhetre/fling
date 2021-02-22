const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');


const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const compatibility = require('../../models/compatibility');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('profilePicture', 'Profile Picture is required').not().isEmpty(),
  check('college', 'college is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

        // lets calculate compatibility now
     var profiles = [];
     var Couple = [];
      Profile.find({} , (err, profiles) => {
          if(err){
            console.error(err.message);
            res.status(500).send('Error while mapping profiles in routes/api/profile.js');
          }
         Profile.findOne({user: req.user.id}, 
            function(err,currprofile) {

              profiles.map(profile => {
                //calculate coupleCompatibility now
                let coupleCompatibility = 0;

                //Age
                let ageDifference = Math.abs(currprofile.age - profile.age);
                if(ageDifference <= 2){
                  coupleCompatibility += 10;
                }else if(ageDifference <= 4){
                  coupleCompatibility += 5;
                }
                
                //Caste
                if(currprofile.caste.toLowerCase().split(" ").splice(-1)[0] === profile.caste.toLowerCase().split(" ").splice(-1)[0]){
                  coupleCompatibility += 50;
                  
                }

                //Chatting or calling
                if(currprofile.chatOrCall === profile.chatOrCall){
                  coupleCompatibility += 5;
                }

                //college
                if(currprofile.college.split(" ")[0].toLowerCase() === profile.college.split(" ")[0].toLowerCase()){
                  coupleCompatibility += 10;
                }

                //cooking
                if(currprofile.cooking === "Yes"){
                  coupleCompatibility += 5;
                }
                if(profile.cooking === "Yes"){
                  coupleCompatibility += 5;
                }

                //dogorcat
                if(currprofile.dogOrcat === profile.dogOrcat){
                  coupleCompatibility += 5;
                }

                //about drinking
                if(currprofile.drinker === profile.drinker){
                  coupleCompatibility += 15;
                }

                //smoking
                 if(currprofile.smoker === profile.smoker){
                  coupleCompatibility += 15;
                }

                if(currprofile.favoriteseries === profile.favoriteseries){
                  coupleCompatibility += 5;
                }
                if(currprofile.favoritesitecom === profile.favoritesitecom){
                  coupleCompatibility += 5;
                }

                if(currprofile.fieldOfStudy === profile.fieldOfStudy){
                  coupleCompatibility += 10;
                }

                if(currprofile.genderInterestedIn === "Bisexual" && profile.genderInterestedIn === "Bisexual"){
                  coupleCompatibility += 30 ;
                }else if(currprofile.genderInterestedIn === "Asexual" && profile.genderInterestedIn === "Asexual"){
                  coupleCompatibility += 30 ;
                }else if((currprofile.genderInterestedIn === "Male" && profile.genderInterestedIn === "Female") || (currprofile.genderInterestedIn === "Female" && profile.genderInterestedIn === "Male")){
                  coupleCompatibility += 30 ;
                }

                //Height Difference
                let heightDifference = Math.abs(currprofile.height - profile.height);
                if(heightDifference < 5){
                  coupleCompatibility += 10;
                }else if(heightDifference <10){
                  coupleCompatibility += 5;
                }

                //Location
                if(currprofile.location.replace(/\s/g, "").toLowerCase() === profile.location.replace(/\s/g, "").toLowerCase()){
                  coupleCompatibility += 10;
                }

                //poessesive
                if(currprofile.poessesive === profile.poessesive){
                  coupleCompatibility += 10;
                }

                 //politics
                 if(currprofile.politics === profile.politics){
                  coupleCompatibility += 5;
                }

                 //reading
                 if(currprofile.reading === profile.reading){
                  coupleCompatibility += 10;
                }

                 //religious
                 if(currprofile.religion === profile.religion){
                  coupleCompatibility += 10;
                }
                    
                //Ideal night
                 if(currprofile.spendNight === profile.spendNight){
                  coupleCompatibility += 10;
                }

                 //Ideal vacation
                 if(currprofile.travel === profile.travel){
                  coupleCompatibility += 10;
                }

                 //what vert
                 if((currprofile.whatVert === "Introvert" && profile.whatVert === "Extrovert") || currprofile.whatVert === "Extrovert" && profile.whatVert === "Introvert"){
                  coupleCompatibility += 10;
                }else if((currprofile.whatVert === "Introvert" && profile.whatVert === "Introvert") || currprofile.whatVert === "Extrovert" && profile.whatVert === "Extrovert"){
                  coupleCompatibility -= 10;
                }

                //Virginity
                if(currprofile.virginity === profile.virginity){
                  coupleCompatibility += 10;
                }
                let profileUserStr = JSON.stringify(profile.user);
                let reqUserIdStr   = JSON.stringify(req.user.id);

                coupleCompatibility *= 0.37735849056;

                //user1 always has greater id than user2
                //if logged in user has greater id than mapping profile id add them
                if(reqUserIdStr > profileUserStr){
                 
                async function addCouple(){
                    let Couple = await compatibility.findOneAndUpdate(
                      {'user1': req.user.id,'user2': profile.user},
                      {$set:{ 'user1': req.user.id,'user2': profile.user, 'CompatibilityPercentage': coupleCompatibility}},
                      {
                      new: true,  //return the updated entry
                      upsert: true, //upsert creates new entry if not present else updates 
                      rawResult: true // Return the raw result from the MongoDB driver
                    });
                  }
                  addCouple();
                //if mapping profile userid is greater than logged in userid then add them  
                }else if(reqUserIdStr < profileUserStr){
                 
                  async function addCouple2(){
                      let Couple = await compatibility.findOneAndUpdate(
                        {'user1': profile.user ,'user2': req.user.id},
                        {$set:{ 'user1': profile.user,'user2': req.user.id, 'CompatibilityPercentage': coupleCompatibility}},
                        {
                        new: true,  //return the updated entry
                        upsert: true, //upsert creates new entry if not present else updates 
                        rawResult: true // Return the raw result from the MongoDB driver
                      });
                    }
                    addCouple2();
                }
              
  
            });
              
            });
            
         
    
      

        });

        const returnObj = {profiles, Couple};

      return res.json(returnObj);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Private
router.get('/', auth, async (req, res) => {

  try {
    let retObj = [];

    let profiles = await Profile.find().populate('user', ['name']);//find Profiles
        profiles.forEach((OneProfile) => {
          let requserid = req.user.id;
          let OneProfileuserid = OneProfile.user._id;
          let OneCouple={};
    
          if(requserid > OneProfileuserid){
            let temp = requserid;
            requserid = OneProfileuserid;
            OneProfileuserid = temp;
          }
          
          //When user tries to load their own profile, cant compute compability for them
          if(OneProfileuserid == requserid){
            OneCouple = {
              user1: OneProfileuserid,
              user2: requserid,
              CompatibilityPercentage: 100
            }     
            retObj.push({OneProfile,OneCouple});
           
          }else{
           async function GetCouple (){

              Couple = await compatibility.findOne({
                user1: OneProfileuserid, user2:requserid
              },(error,OneCouple)=>{

                retObj.push({OneProfile,OneCouple});
                
                if(retObj.length == profiles.length){
   
                  function compare( a, b ) {
                    if ( a.OneCouple.CompatibilityPercentage < b.OneCouple.CompatibilityPercentage ){
                      return 1;
                    }
                    else if ( a.OneCouple.CompatibilityPercentage > b.OneCouple.CompatibilityPercentage ){
                      return -1;
                    }
                    return 0;
                  }
                  
                  retObj.sort( compare );
                  return res.json(retObj);
                  }
              }).populate('compatibility');
          }//end of func
          GetCouple();
         

        }//end of else   
         
        }); //end of forEach




  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Private
router.get(
  '/user/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req , res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate('user', ['name']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      let user1id = req.params.user_id;
      let user2id = req.user.id;
      if(user2id > user1id){
        user1id = req.user.id;
        user2id = req.params.user_id;
      }
      //When user tries to load their own profile, cant compute compability for them
      if(user1id === user2id){
        const Couple = {
          user1: user1id,
          user2: user2id,
          CompatibilityPercentage: 100
        }
        const retObj={profile,Couple}
        return res.json(retObj);
      }

      const Couple = await compatibility.findOne({
        user1: user1id, user2:user2id
      }).populate('CoupleCompability');
  
      if (!Couple) return res.status(400).json({ msg: 'couple not found' });
    
 
      const obj = {profile,Couple};

      return res.json(obj);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error while getting one particular profile' });
    }

  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error while deleting profile');
  }
});

module.exports = router;
