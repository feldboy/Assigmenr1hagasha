const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Post = require('../models/post');

// 1. Create a New Comment
router.post('/', async (req, res) => {
    try {
        const { postId, content, sender } = req.body;

        if (!postId || !content || !sender) {
            return res.status(400).json({ error: 'Post ID, content, and sender are required' });
        }

        // Verify that the post exists
        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = new Comment({
            post: postId,
            content,
            sender
        });

        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }
        res.status(500).json({ error: error.message });
    }
});

// 2. Get All Comments (optionally filtered by postId)
router.get('/', async (req, res) => {
    try {
        const { postId } = req.query;
        const query = postId ? { post: postId } : {};
        const comments = await Comment.find(query).populate('post', 'title');
        res.json(comments);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }
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
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid comment ID format' });
        }
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
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid comment ID format' });
        }
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
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ error: 'Invalid comment ID format' });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
