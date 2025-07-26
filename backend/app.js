import express from "express";
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', chatRoutes);
app.use('/api', uploadRoutes);

export default app;