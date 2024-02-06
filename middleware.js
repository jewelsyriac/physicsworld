const QuestionModel = require('./models/question');
const { questionSchema, ReviewSchema } = require('./schemas.js');
const ExpressError = require('./models/utils/ExpressError');
const { reviewSchema } = require('./schemas');
const Review =require('./models/review');


module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You should sign in first !');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateQuestion = (req, res, next) => {
    const { error } = questionSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req,res,next)=>{
    const {id} = req.params;
    const question = await QuestionModel.findById(id);
    if(!question.author.equals(req.user._id)){
        req.flash('error','You dont have permission to do this!');
        return res.redirect(`/questions/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}