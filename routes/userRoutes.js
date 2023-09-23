const express = require('express');
const {registerUser, authUser, updateUserProfile} = require('../controllers/userControllers.js');
const {protect} = require('../middleWares/authMiddleWare.js')

const router = express.Router();

router.route('https://notesphere-backend-hkk4.onrender.com/').post(registerUser);
router.route('https://notesphere-backend-hkk4.onrender.com/login').post(authUser);
router.route('https://notesphere-backend-hkk4.onrender.com/profile').post(protect,updateUserProfile);

module.exports =  router;
