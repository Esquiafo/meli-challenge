import { Router } from 'express';
import { getDestination, getOrigin, getProtocol } from '../service/packet.services.js';

const router = Router();

router.get('/destination', async (req, res) => {
    try {
        const data = await getDestination();
        res.json(data);
    } catch (err) {
        console.error('Error in destination API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/origin', async (req, res) => {
    try {
        const data = await getOrigin();
        res.json(data);
    } catch (err) {
        console.error('Error in origin API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/protocol', async (req, res) => {
    try {
        const data = await getProtocol();
        res.json(data);
    } catch (err) {
        console.error('Error in protocol API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
