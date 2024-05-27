import { Button, Steps, message } from "antd";
import Step1 from "./Steps/Step1";
import { useState } from "react";
import Step2 from "./Steps/Step2";
import { useRecoilState } from "recoil";
import { formValue } from "../../atoms/formValue";

export default function Timbang() {
  const [current, setCurrent] = useState(0);
  const [currentValue] = useRecoilState(formValue);
  const { Step } = Steps;
  const steps = [
    {
      title: "Masukkan Data",
      content: <Step1 />,
    },
    {
      title: "Timbang Sampahmu",
      content: <Step2 />,
    },
  ];
  return (
    <div className="w-[90%] flex flex-col items-center gap-16 pt-12">
      <h1 className="text-xl font-bold md:text-3xl">
        Mari Kita Lihat{" "}
        <span className="font-bold text-primary">
          Potensi Sampah<span className="text-black">Mu</span>
        </span>{" "}
      </h1>

      <div className="w-full md:w-[50%] flex flex-col gap-12">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content min-h-[35dvh]">
          {steps[current].content}
        </div>
        <div className="self-end steps-action">
          {current > 0 && (
            <Button
              style={{ marginRight: 8 }}
              onClick={() => setCurrent(current - 1)}
            >
              Sebelumnya
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              disabled={
                currentValue.trash_type == 0 || currentValue.member_id == 0
              }
              type="primary"
              onClick={() => setCurrent(current + 1)}
            >
              Selanjutnya
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              disabled={currentValue.weight == 0}
              onClick={() => message.success("Processing complete!")}
            >
              Selesai
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
