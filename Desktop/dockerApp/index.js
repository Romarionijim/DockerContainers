const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 60000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('successfully conencted to DB'))
        .catch((e) => {
            console.log(`error => ${e}`)
            setTimeout(connectWithRetry, 5000);
        });
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Hello from Docker!!!</h1>")
})

//localhost:3000/api/v1/posts/
app.use('/posts', postRouter);
app.use('/users', userRouter);
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`));