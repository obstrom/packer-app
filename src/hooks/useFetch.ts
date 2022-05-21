import { useState } from "react";

export default function useFetch(baseUrl: string, apiKey: string) {
  const [loading, setLoading] = useState(false);

  const post = (url: string, body: object): Promise<any> => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      fetch(baseUrl + url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  };

  return { post, loading };
}
