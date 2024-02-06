const QuestionModel = require('../models/question');

module.exports.getquestions = async (req,res)=>{
    const questions = await QuestionModel.find({});
    res.render('questionFolder/questions',{questions});
};
module.exports.myquestions = async (req,res)=>{
    const currentUserId = req.user._id;
    const questions = await QuestionModel.find({author: currentUserId});
    res.render('questionFolder/myquestions',{questions});
};

module.exports.getNewQuestionPage = (req, res) => {
    res.render('questionFolder/new');
};

module.exports.addQuestionForm = async (req, res) => {
    const question = new QuestionModel(req.body);
    question.author = req.user._id;
    await question.save();
    req.flash('success','Successfully added a question.');
    res.redirect(`/questions/${question._id}`)
};

module.exports.showEachQuestion = async (req, res,) => {
    const question = await QuestionModel.findById(req.params.id).populate({
        path:'reviews',
        populate :{
            path:'author'
        }
    }).populate('author');
    if(!question){
        req.flash('error',"Cant find the question. May be deleted !");
        return res.redirect('/questions');
    };
    res.render('questionFolder/show', { question });
};

module.exports.getEditform = async (req, res) => {
    const question = await QuestionModel.findById(req.params.id)
    res.render('questionFolder/edit', { question });
};

module.exports.editQuestion = async (req, res) => {
    const { id } = req.params;
    const question = await QuestionModel.findByIdAndUpdate(id, { ...req.body});
    req.flash('success','Successfully edited the question.');
    res.redirect(`/questions/${question._id}`)
};

module.exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    await QuestionModel.findByIdAndDelete(id);
    req.flash('success','Successfully deleted a question.');
    res.redirect('/questions');
} ;

