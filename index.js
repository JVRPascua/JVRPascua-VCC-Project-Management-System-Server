import dotenv from 'dotenv'; 
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import projectsRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/projects', projectsRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});