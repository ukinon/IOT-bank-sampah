import { Button, Steps, message } from "antd";
import Step1 from "./Steps/Step1";
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { formValue } from "../../atoms/formValue";
import { addTransaction } from "../../apis/transactions";
import { useMutation } from "@tanstack/react-query";
import { useGetTrash } from "../../hooks/trashes";
import Step2Total from "./Steps/Step2Total";
import Step2Weight from "./Steps/Step2Weight";

export default function Timbang() {
  const [current, setCurrent] = useState(0);
  const [currentValue] = useRecoilState(formValue);
  const reset = useResetRecoilState(formValue);
  const { isPending, mutate } = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      message.success("Berhasil buat transaksi");
      reset();
      setCurrent(0);
    },
  });
  const { data } = useGetTrash(currentValue.trash_id);
  const { Step } = Steps;
  const steps = [
    {
      title: "Isi data dulu yuk",
      content: <Step1 />,
    },
    {
      title: "Timbang sampahmu",
      content: data?.data.unit == "Satuan" ? <Step2Total /> : <Step2Weight />,
    },
  ];

  const onSubmit = async () => {
    mutate(currentValue);
  };
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
              disabled={isPending}
              onClick={() => setCurrent(current - 1)}
            >
              Sebelumnya
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              disabled={
                currentValue.trash_id == 0 ||
                currentValue.member_id == 0 ||
                isPending
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
              disabled={currentValue.weight == 0 || isPending}
              onClick={onSubmit}
            >
              Selesai
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
