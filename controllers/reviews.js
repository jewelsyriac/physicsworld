const QuestionModel = require('../models/question');
const Review =require('../models/review');

module.exports.createAnswer = async (req,res)=>{
    const {id, reviewId} = req.params;
    const question = await QuestionModel.findById(id);
    const review = new Review(req.body);
    review.author= req.user._id;
    question.reviews.push(review);
    await review.save();
    console.log(review.author)
    await question.save();
    req.flash('success','Created new answer.');
    res.redirect(`/questions/${question._id}`);
};
module.exports.editAnswer = async (req,res)=>{
    const {id, reviewId} = req.params;
    const question = await QuestionModel.findById(id);
    const review = await Review.findByIdAndUpdate(reviewId);
    review.replies.replyauthor= req.user._id;
    question.reviews.push(review);
    await review.save();
    await question.save();
    req.flash('success','Successfully replied.');
    res.redirect(`/questions/${question._id}`);
};

module.exports.deleteAnswer = async(req,res)=>{
    const {id, reviewId} = req.params;
    await QuestionModel.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted a review.');
    res.redirect(`/questions/${id}`);
};