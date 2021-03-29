const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const convert = require('xml-js');
const path = require('path');
const chalk = require('chalk');
const courseModel = require('./models/Course');
const options = { compact: true, ignoreComment: true, spaces: 4 };

require('dotenv').config();
const app = express();

app.get('/', async (req, res) => {
    const { save } = req.query;
    const course = await courseModel.find();
    if (save === 'true') {
        fs.writeFile(path.resolve(__dirname, 'data.xml'), convert.json2xml(course, options), 'utf8', (err) => {
            if (err) throw err;
            else console.log('Ghi file thanh cong');
        })
    }
    res.json(course);
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log('DB connected'))
    .catch(err => { throw new Error(err.reason) })

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: http://localhost:${process.env.PORT || 5000}`)
    );
});