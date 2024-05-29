export default function WhyUsSection() {
  const data = [
    {
      title: "Mengubah Sampah Menjadi Berkah",
      description:
        "Jangan biarkan sampah hanya menjadi beban lingkungan. Dengan SampahMu, setiap sampah yang kamu kumpulkan bisa menjadi sumber keuntungan dan manfaat. Kami membantu mengubah sampah menjadi sesuatu yang berharga dengan cara yang mudah dan praktis.",
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
    <div className="flex justify-center w-[90%]">
      <div className="flex flex-col gap-12 md:gap-0 justify-center md:justify-start items-center md:items-start md:flex-row w-full md:w-[70%] mt-24">
        <h1 className="w-full text-3xl text-center md:text-5xl md:w-1/2 md:text-start">
          Kenapa harus pakai <span className="text-primary">Sampah</span>Mu?
        </h1>
        {
          <div className="flex flex-col w-full gap-8 md:w-1/2">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h2 className="flex items-center gap-3 text-lg font-semibold md:text-2xl">
                  <span className="flex items-center justify-center py-1 text-white rounded-full w-9 md:w-12 bg-primary/75">
                    {index + 1}
                  </span>
                  {item.title}
                </h2>
                <p className="text-sm font-light md:text-lg">
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
