import { Select } from "antd";
import { useGetTrashes } from "../../../hooks/trashes";
import { Trash } from "../../../types/Trash";
import { useGetMembers } from "../../../hooks/members";
import { Member } from "../../../types/Member";
import { useRecoilState } from "recoil";
import { formValue } from "../../../atoms/formValue";
import { formatToIDR } from "../../../lib/formatToIDR";

export default function Step1() {
  const { data: trashes } = useGetTrashes("1&perPage=10000000");
  const { data: members } = useGetMembers("1&perPage=10000000");
  const [currentValue, setCurrentValue] = useRecoilState(formValue);
  const { Option } = Select;

  function handleChange(value: number, name: string) {
    setCurrentValue({
      ...currentValue,
      [name]: value,
    });
  }

  return (
    <div className="flex flex-col items-start w-full gap-8">
      <h2 className="font-semibold">Pilih Jenis Sampahmu</h2>

      <Select
        showSearch
        placeholder="Pilih Jenis Sampah"
        className="w-full rounded-lg text-primary"
        defaultValue={currentValue?.trash_id || undefined}
        optionFilterProp="children"
        onChange={(value) => handleChange(value, "trash_id")}
        filterOption={(input, option) =>
          option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {trashes?.data.data.map((trash: Trash) => (
          <Option value={trash.id} key={trash.id}>
            {`${trash.name} (${trash.code}) - ${formatToIDR(trash.price)} / ${
              trash.unit
            }`}
          </Option>
        ))}
      </Select>

      <h2 className="font-semibold">Pilih Member</h2>

      <Select
        showSearch
        placeholder="Pilih Member"
        className="w-full rounded-lg text-primary"
        defaultValue={currentValue?.member_id || undefined}
        optionFilterProp="children"
        onChange={(value) => handleChange(value, "member_id")}
        filterOption={(input, option) =>
          option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {members?.data.data.map((member: Member) => (
          <Option value={member.id} key={member.id}>
            {`${member.name} - ${member.address ?? "Tidak ada alamat."}`}
          </Option>
        ))}
      </Select>
    </div>
  );
}
