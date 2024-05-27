import { useGetTrashes } from "../hooks/trashes";
import { Trash } from "../types/Trash";

export default function PriceList() {
  const { data } = useGetTrashes();
  return (
    <div className="flex flex-col w-full ">
      {data.data.map((data: Trash) => (
        <p>
          {data.name} ({data.code}) - {data.price}
        </p>
      ))}
    </div>
  );
}
