const API_BASE_URL = 'http://localhost:5000/api';

export const fetchDestinationData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/destination`);
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching destination data:', error);
        throw error;
    }
};

export const fetchOriginData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/origin`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching origin data:', error);
        throw error;
    }
};

export const fetchProtocolData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/protocol`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching protocol data:', error);
        throw error;
    }
};
