const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');

// 1. Add a New Post
router.post('/', async (req, res) => {
    try {
        const { title, content, sender } = req.body;

        if (!title || !content || !sender) {
            return res.status(400).json({ error: 'Title, content, and sender are required' });
        }

        const post = new Post({
            title,
            content,
            sender
        });

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get All Posts (optionally filtered by sender)
router.get('/', async (req, res) => {
    try {
        const { sender } = req.query;
        const query = sender ? { sender } : {};
        const posts = await Post.find(query);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get a Post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a Post
router.put('/:id', async (req, res) => {
    try {
        const { title, content, sender } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, sender },
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
