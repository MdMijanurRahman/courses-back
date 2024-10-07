const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load courses data
// const courses = JSON.parse(fs.readFileSync('./courseDetails.json', 'utf-8'));
const courses = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'courseDetails.json'), 'utf-8'));

console.log('__dirname:', __dirname);
console.log('Resolved path:', path.join(__dirname, 'data', 'courseDetails.json'));
// API Endpoints
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.course_id === req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
