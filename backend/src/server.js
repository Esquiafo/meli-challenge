import express from 'express';
import packetController from './controller/packet.controller.js';
import { loadProtocols } from './service/protocol.services.js';
import cors from 'cors'

const app = express();

loadProtocols();

app.use(express.json());
app.use(cors());

app.use('/api', packetController);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
