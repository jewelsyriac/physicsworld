const express = require("express");
const router = express.Router();
const catchAsync = require('../models/utils/catchAsync');
const {isLoggedIn} = require('../middleware');
const {validateQuestion} = require('../middleware');
const {isAuthor} = require('../middleware');
const questions = require('../controllers/questions');




router.get("/",catchAsync(questions.getquestions));

router.get("/myquestions",isLoggedIn, catchAsync(questions.myquestions));

router.get('/new', isLoggedIn, questions.getNewQuestionPage);

router.post('/',isLoggedIn, validateQuestion,catchAsync(questions.addQuestionForm));

router.get('/:id', catchAsync(questions.showEachQuestion));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(questions.getEditform));

router.put('/:id', isLoggedIn, validateQuestion, isAuthor,catchAsync(questions.editQuestion));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(questions.deleteQuestion));

module.exports = router;