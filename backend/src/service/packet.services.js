import { pool } from '../database/config.js';
import { getMapping } from './protocol.services.js';

export async function getDestination() {
    try {
        const { rows } = await pool.query(`
            SELECT destination_ip, COUNT(*) as count, SUM(size) / 1000 as total_kb
            FROM packets
            GROUP BY destination_ip
            ORDER BY count DESC
            LIMIT 5;
        `);
        return rows;
    } catch (err) {
        throw new Error(`Error fetching top destination IPs: ${err.message}`);
    }
}

export async function getOrigin() {
    try {
        const { rows } = await pool.query(`
            SELECT source_ip, COUNT(*) as count, SUM(size) / 1000 as total_kb
            FROM packets
            GROUP BY source_ip
            ORDER BY count DESC
            LIMIT 5;
        `);
        return rows;
    } catch (err) {
        throw new Error(`Error fetching top source IPs: ${err.message}`);
    }
}

export async function getProtocol() {
    try {
        const { rows } = await pool.query(`
            SELECT protocol, COUNT(*) AS count, SUM(size) / 1000 as total_kb
            FROM packets
            GROUP BY protocol
            ORDER BY count DESC;
        `);

        const protocolMappings = await getMapping();

        const mappedRows = rows.map(row => ({
            protocol: protocolMappings[row.protocol]?.keyword || row.protocol,
            count: row.count,
            total_kb: row.total_kb
        }));

        return mappedRows;
    } catch (err) {
        throw new Error(`Error fetching protocol counts: ${err.message}`);
    }
}
