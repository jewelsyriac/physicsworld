const express = require("express");
const router = express.Router({mergeParams : true});
const catchAsync = require('../models/utils/catchAsync');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const { deleteAnswer, createAnswer } = require("../controllers/reviews");




router.post('/',isLoggedIn, validateReview, catchAsync(createAnswer));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(deleteAnswer));

module.exports = router;