import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Bagaimana cara kerja SampahMu?",
    children: (
      <p className="text-base font-normal md:text-lg">
        SampahMu membantu kamu mendaur ulang sampah dengan mudah dan efisien.
        Setiap sampah yang kamu kumpulkan akan ditimbang dan dinilai secara
        transparan. Kamu bisa melihat nilai dari sampah yang telah kamu setorkan
        dan mendapatkan reward sesuai dengan jumlah sampah yang kamu daur ulang.
      </p>
    ),
  },
  {
    key: "2",
    label: "Apa saja jenis sampah yang bisa didaur ulang melalui SampahMu?",
    children: (
      <p className="text-base font-normal md:text-lg">
        SampahMu menerima berbagai jenis sampah yang bisa didaur ulang seperti
        plastik, kertas, kaca, dan logam. Pastikan sampah sudah dipilah dan
        dalam kondisi bersih sebelum disetorkan.
      </p>
    ),
  },
  {
    key: "3",
    label: "Apakah ada biaya untuk menggunakan layanan SampahMu?",
    children: (
      <p className="text-base font-normal md:text-lg">
        Tidak, layanan SampahMu sepenuhnya gratis untuk digunakan. Kami ingin
        memudahkan setiap orang untuk berkontribusi dalam menjaga kebersihan
        lingkungan tanpa harus mengeluarkan biaya tambahan.
      </p>
    ),
  },
];

const FAQSection: React.FC = () => (
  <div className="w-[90%] flex flex-col gap-5 mb-24 mt-24">
    <h1 className="text-3xl md:text-5xl text-primary">FAQ</h1>

    <Collapse accordion items={items} className="text-lg md:text-xl" />
  </div>
);

export default FAQSection;
