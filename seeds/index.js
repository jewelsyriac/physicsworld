const mongoose = require('mongoose');
const methodOverride = require('method-override');
const QuestionModel = require('../models/question');
const questionBank = require("./questionbank")

mongoose.connect('mongodb+srv://jewelsyriac:llZ9musVbLJ71sAb@cluster0.iorbrgj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const deleteAll = async()=>{
    await QuestionModel.deleteMany({});
    console.log("Deleted all !")
};

const addRandomQuestions = async()=>{
    for (let i=0; i<10;i++){
        const randomNumber = Math.floor(Math.random() * questionBank.length);
        const question = new QuestionModel({
            author:'65bf777bda566277dfd8a6a0',
            question : `${questionBank[randomNumber].question}`,
            exam : `${questionBank[randomNumber].exam}`,
            subject : `${questionBank[randomNumber].subject}`,
            options : questionBank[randomNumber].options,
            answer : `${questionBank[randomNumber].answer}`,
            solution : `${questionBank[randomNumber].solution}`
        });
        await question.save();
        console.log(`Successfully added ${i} questions!`);
    };
}

/* deleteAll(); */

addRandomQuestions().then(()=>{
    mongoose.connection.close();
});
