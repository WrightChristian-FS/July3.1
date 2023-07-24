const twig = require('twig');
const express = require('express');
const router = express.Router();
const { Question } = require('../models')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))


// Index.twig
router.get('/', async (req, res) => {
    const questions = await Question.findAll()
    res.render('questions/questionIndex', { questions })
})



router.get('/new', (req, res) => {
    res.render('questions/createQuestion');
});



router.post('/', async (req, res) => {
    const { question } = req.body;
    const questionOption = await Question.create({ question });
    res.redirect('/questions/' + question.id);
});



router.get('/:id', async (req, res) => {
    const question = await Question.findByPk(req.params.id);
    res.render('questions/showQuestion', { question });
});



router.get('/:id/edit', async (req, res) => {
    const question = await Question.findByPk(req.params.id);
    res.render('questions/editQuestion', { question });
});



router.post('/:id', async (req, res) => {
    const { question } = req.body;
    const { id } = req.params;
    await Question.update({ question }, { where: { id } });
    res.redirect('/questions/' + id);
});



router.get('/:id/delete', async (req, res) => {
    const { id } = req.params;
    await Question.destroy({ where: { id } }); 
    res.redirect('/questions');  
});



module.exports = router