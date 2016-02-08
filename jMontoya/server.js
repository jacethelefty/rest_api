const mongoose = require('mongoose');
const express = require('express');
const app = express();
const politicianRouter = require(__dirname + '/routes/dem_routes');
const politicianRouter2 = require(__dirname + '/routes/rep_routes');
const authRouter = require(__dirname + '/routes/auth_routes');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/politiciansdb');

app.use('/api', politicianRouter);
app.use('/api', politicianRouter2);
app.use('/api', authRouter);

app.listen(PORT, () => console.log('server up on port: ' + PORT));
