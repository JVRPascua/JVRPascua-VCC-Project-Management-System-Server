import dotenv from 'dotenv'; 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import projectsRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import commentsRoutes from './routes/comments.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/projects', projectsRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use('/comments', commentsRoutes);

const port = process.env.PORT;

app.listen(port || 5000, () => {
    console.log(`App running on port ${port}.`);
 });