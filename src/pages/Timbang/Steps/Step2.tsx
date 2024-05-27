import { Button } from "antd";
import { useRecoilState } from "recoil";
import { formValue } from "../../../atoms/formValue";

export default function Step2() {
  const [currentValue] = useRecoilState(formValue);
  return (
    <div className="flex flex-col items-start w-full h-full gap-8">
      <h2 className="font-semibold">3. Timbang Sampahmu</h2>
      <h1 className="self-center text-5xl justify-self-center md:text-8xl text-primary">
        {currentValue.weight ?? 0}{" "}
        <span className="text-sm text-black md:text-base">gram</span>
      </h1>

      <Button
        type="primary"
        className="self-center w-1/2 text-white bg-primary hover:opacity-75"
      >
        Timbang
      </Button>
    </div>
  );
}
