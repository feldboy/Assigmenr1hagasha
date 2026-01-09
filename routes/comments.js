const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

// 1. Create a New Comment
router.post('/', async (req, res) => {
    try {
        const { post, content, sender } = req.body;

        if (!post || !content || !sender) {
            return res.status(400).json({ error: 'Post ID, content, and sender are required' });
        }

        // Verify that the post exists
        const postExists = await Post.findById(post);
        if (!postExists) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = new Comment({
            post,
            content,
            sender
        });

        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get All Comments (optionally filtered by post)
router.get('/', async (req, res) => {
    try {
        const { post } = req.query;
        const query = post ? { post } : {};
        const comments = await Comment.find(query).populate('post', 'title');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get a Comment by ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('post', 'title');

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a Comment
router.put('/:id', async (req, res) => {
    try {
        const { content, sender } = req.body;
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content, sender, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a Comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json({ message: 'Comment deleted successfully', comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

