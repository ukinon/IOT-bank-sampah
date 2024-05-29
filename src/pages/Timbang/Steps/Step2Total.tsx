import { useRecoilState } from "recoil";
import { formatToIDR } from "../../../lib/formatToIDR";
import { formValue } from "../../../atoms/formValue";
import { useGetTrash } from "../../../hooks/trashes";
import { InputNumber } from "antd";

export default function Step2Total() {
  const [currentValue, setCurrentValue] = useRecoilState(formValue);
  const { data } = useGetTrash(currentValue.trash_id);
  console.log(currentValue);
  const handleChange = (value: number | string | null | undefined) => {
    setCurrentValue({
      ...currentValue,
      weight: value as number,
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-8 mt-12">
      <>
        <div className="flex flex-row items-end justify-center w-full gap-2">
          <InputNumber
            onChange={(val) => handleChange(val)}
            type="number"
            defaultValue={currentValue.weight || 0}
            className="w-[30%] text-8xl text-primary"
            min={0}
          />
          <h1 className="text-base font-semibold text-black md:text-xl ">
            Buah
          </h1>
        </div>

        <h1 className="self-center text-xl font-semibold 2xl:mt-24 md:text-2xl">
          Value <span className="font-bold text-primary">Sampah</span>
          <span className="font-bold">Mu</span>:{" "}
          <span className="text-primary">
            {formatToIDR(currentValue.weight * data?.data.price)}
          </span>
        </h1>
      </>
    </div>
  );
}
