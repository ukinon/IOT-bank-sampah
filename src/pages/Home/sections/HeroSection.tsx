import { Button } from "antd";
import HeroImage from "../../../assets/home/hero.svg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-[90%] h-screen md:h-[80dvh] gap-12">
      <div className="flex flex-col items-center gap-8 md:pt-0 md:items-start">
        <h1 className="text-3xl font-semibold text-center text-primary md:text-4xl md:text-start">
          Sampah Juga Punya <span className="italic">Value</span>
        </h1>
        <p className="text-lg font-thin">
          Jangal asal dibuang, lihat potensinya!
        </p>
        <Link to="/app" className="flex justify-center w-full md:justify-start">
          <Button
            type="primary"
            className="flex items-center justify-center w-1/2 p-5 text-white bg-primary hover:opacity-75"
          >
            Lihat value sampahmu
          </Button>
        </Link>
      </div>
      <div className="w-full md:w-1/2">
        <img src={HeroImage} />
      </div>
    </div>
  );
}
