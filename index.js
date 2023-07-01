import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors({ credentials : true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to GHZ API!!!" });
});

app.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`) });