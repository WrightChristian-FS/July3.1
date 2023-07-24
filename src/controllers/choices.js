const twig = require('twig');
const express = require('express');
const router = express.Router();
const { Choice } = require('../models');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
    const choices = await Choice.findAll();
    res.render('choices/indexChoices', { choices });
});



router.get('/new', (req, res) => {
    res.render('choices/createChoices');
});



router.post('/', async (req, res) => {
    const { choice } = req.body;
    const choiceOption = await Choice.create({ choice });
    res.redirect('/choices/' + choice.id);
});



router.get('/:id', async (req, res) => {
    const choice = await Choice.findByPk(req.params.id);
    res.render('choices/showChoices', { choice });
});



router.get('/:id/edit', async (req, res) => {
    const choice = await Choice.findByPk(req.params.id);
    res.render('choice/editChoices', { choice });
});



router.post('/:id', async (req, res) => {
    const { choice } = req.body;
    const { id } = req.params;
    await Choice.update({ choice }, {
        where: { id }
    });
    res.redirect('/choices/' + id);
});



router.get('/:id/delete', async (req, res) => {
    const { id } = req.params;
    await Choice.destroy({
        where: { id }
    });
    res.redirect('/choices');
});



module.exports = router;
