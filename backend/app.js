import express from "express";
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', chatRoutes);

export default app;