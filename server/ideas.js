const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (!idea) {
        res.status(404).send();
    } else {
        req.idea = idea;
        next();
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});