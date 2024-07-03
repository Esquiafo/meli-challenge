import React, { useState, useEffect } from 'react';
import { fetchDestinationData } from '../api/fetch';

const Destination = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await fetchDestinationData();
                setData(responseData);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Error fetching data');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            <h3>Top 5 Destination IPs:</h3>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {item.destination_ip} - Count: {item.count} - kB: {item.total_kb}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Destination;