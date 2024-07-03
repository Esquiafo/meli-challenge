import React, { useState, useEffect } from 'react';
import { fetchProtocolData } from '../api/fetch';

const Protocol = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await fetchProtocolData();
                setData(responseData);
                console.log(data)
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
            <h3>Protocol Counts:</h3>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {item.protocol} - Count: {item.count} - kB: {item.total_kb}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Protocol;
