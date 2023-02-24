import dotenv from 'dotenv'; 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
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
const socketPort = 8000;

const socketServer = app.listen(socketPort, () => {
    console.log(`Listening on port ${socketPort}`);
});

const io = new Server(socketServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
 });

const emitMostRecentComments = () => {
    commentsRoutes.getSocketComments()
       .then((result) => io.emit("comments", result))
       .catch(console.log);
};

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("comments", (cmnt) => {
        commentsRoutes.createSocketComment(JSON.parse(cmnt))
            .then((_) => {
                emitMostRecentComments();
            })
            .catch((err) => io.emit(err));
    })
    socket.on("disconnect", () => {
        console.log("user disconnected");
     });
})