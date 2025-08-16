import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface Character {
  name: string;
  height: number;
  mass: number;
}

const fetchFn = async (id: number) => {
  await new Promise((result) => setTimeout(result, 2000));
  const result = await axios.get<Character>(
    `https://swapi.info/api/people/${id}`
  );
  return result.data;
};

export default function SwapiExample() {
  const [count, setCount] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["character", count],
    queryFn: () => fetchFn(count),
    enabled: count > 0,
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={() => setCount(count + 1)}>
        Current count is {count}
      </button>
    </div>
  );
}
