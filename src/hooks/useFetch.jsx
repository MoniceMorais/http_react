import { useState, useEffect } from "react";


export const useFetch = (url) => {
    // 4- Custom hook para resgate de dados
    const [data, setData] = useState(null);

    // 5- Refatorando o POST
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
        }
    };

    // 4- Custom hook para resgate de dados
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        }

        fetchData();
    }, [url, callFetch]);

    // 5- Refatorando o POST
    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                const json = await res.json();
                setCallFetch(json);
            }
        };

        httpRequest();

    }, [config, method, url]);


    return { data, httpConfig };
};
