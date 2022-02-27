const express = require('express');
const { updateOne } = require('../models/Post');
const router = express.Router();
const Post = require('../models/Post');


// Get back all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// Submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        name: req.body.name,
        age: req.body.age,
        nationality: req.body.nationality,
        nativeLanguage: req.body.nativeLanguage,
        education: req.body.education,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary
    });

    try {
        const savedPost = await post.save()
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post)
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete post
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove({_id: req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update a post
router.put('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne({_id: req.params.postId}, { $set: {salary: req.body.salary}})
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;