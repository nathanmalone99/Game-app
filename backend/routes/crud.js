const express = require('express')
const router = express.Router();

router.post('/create', (req, res, next) => {
    res.status(200).json({ message: 'Post request is working!' });
});

router.get('/read', (req, res, next) => {
    res.status(200).json({ message: 'Get request is working!' });
});

router.put('/update', (req, res, next) => {
    res.status(200).json({ message: 'Put request is working!' });
});

router.delete('/delete/:id', (req, res, next) => {
    res.status(200).json({ message: 'Delete request is working!' });
});