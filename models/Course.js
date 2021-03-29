const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        skillLevel: {
            type: String,
            required: true,
        },
        courseDescription: {
            type: String,
            required: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
    },
    { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('course', CourseSchema);
