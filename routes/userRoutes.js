const express = require('express');
const {registerUser, authUser, updateUserProfile} = require('../controllers/userControllers.js');
const {protect} = require('../middleWares/authMiddleWare.js')

const router = express.Router();

router.route('https://notesphere-backend.vercel.app/').post(registerUser);
router.route('https://notesphere-backend.vercel.app/login').post(authUser);
router.route('https://notesphere-backend.vercel.app/profile').post(protect,updateUserProfile);

module.exports =  router;
