const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review")

const QuestionSchema = new Schema({
    question: String,
    exam: String,
    subject : String,
    options : [String],
    answer: String,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
});

QuestionSchema.post('findOneAndDelete',async function(doc){
if(doc){
    await Review.deleteMany(
        {_id:{
            $in: doc.reviews
        }}
    )
}
})

module.exports = mongoose.model('Question', QuestionSchema);