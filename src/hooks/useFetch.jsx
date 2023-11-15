import { useState, useEffect } from "react";

// 4- Custom hook para resgate de dados
export const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        }

        fetchData();
    }, [url]);

    return { data };
};
