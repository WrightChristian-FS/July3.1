const express = require('express'); 
const app = express(); 
const { Quiz, Question, Choice } = require('./src/models'); 
const quizzesCtrl = require('./src/controllers/quizzes'); 
const questionCtrl = require('./src/controllers/questions'); 
const choiceCtrl = require('./src/controllers/choices')

app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')

// GET 
app.get('/', async(req,res) => { 
    res.render('home/home')
})

app.use('/quizzes', quizzesCtrl); 
app.use('/questions', questionCtrl); 
app.use('/choices', choiceCtrl); 


app.listen(3000)