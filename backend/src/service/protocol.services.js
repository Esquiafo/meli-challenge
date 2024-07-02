import fs from 'fs/promises';

let protocolMappings = {};

export async function loadProtocols() {
    try {
        const data = await fs.readFile('./protocol.json', 'utf8');
        protocolMappings = JSON.parse(data);
    } catch (err) {
        console.error('Error loading protocol mappings:', err);
    }
}

export async function getMapping() {
    return protocolMappings;
}