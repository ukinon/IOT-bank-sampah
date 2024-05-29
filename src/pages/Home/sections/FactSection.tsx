export default function FactSection() {
  const data = [
    {
      title: "Mengubah Sampah Menjadi Berkah",
      description:
        "Setiap tahun, dunia menghasilkan lebih dari 2 miliar ton sampah dan hanya sebagian kecil yang didaur ulang. Bayangkan berapa banyak yang bisa kita hemat jika kita lebih sadar dalam mengelola sampah.",
    },
    {
      title: "Dukung Lingkungan Bersih",
      description:
        "Bersama SampahMu, kamu berkontribusi langsung pada lingkungan yang lebih bersih dan hijau. Setiap tindakan kecil dalam memilah dan mendaur ulang sampah berperan besar dalam menjaga kelestarian bumi.",
    },
    {
      title: "Transparan dan Terpercaya",
      description:
        "SampahMu menyediakan layanan yang transparan, mulai dari penimbangan hingga penilaian sampah. Kamu bisa memonitor kontribusimu dan melihat langsung nilai dari sampah yang kamu setorkan.",
    },
  ];

  return (
    <div className="flex justify-center md:justify-start w-[90%] bg-primary p-5 md:p-16 rounded-lg text-white">
      <div className="flex flex-col items-center justify-center w-full gap-12 md:gap-12 md:w-full">
        <h1 className="w-full text-3xl text-center md:text-5xl md:text-start">
          Tahukah kamu?
        </h1>
        {
          <div className="flex flex-col justify-between w-full gap-8 md:flex-row ">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <p className="text-sm text-lg font-normal md:text-xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
