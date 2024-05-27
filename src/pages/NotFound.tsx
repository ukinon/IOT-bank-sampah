import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <h1 className="font-bold text-primary text-8xl">
        4<span className="text-black">0</span>4
      </h1>
      <h3 className="text-2xl font-semibold text-primary">
        Halaman tidak ditemukan
      </h3>

      <p className="w-2/3 text-center md:w-1/4">
        Halaman yang kamu cari tidak ditemukan,{" "}
        <Link to="/" className="underline text-primary">
          kembali ke home
        </Link>
      </p>
    </div>
  );
}
