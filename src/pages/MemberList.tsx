import { useGetMembers } from "../hooks/members";
import { Member } from "../types/Member";

export default function MemberList() {
  const { data } = useGetMembers();
  return (
    <div className="flex flex-col w-full ">
      {data.data.map((data: Member) => (
        <p>
          {data.name} - {data.address ?? "Tidak ada alamat."}
        </p>
      ))}
    </div>
  );
}
