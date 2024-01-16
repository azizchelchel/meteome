import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";
// import { apiConfig } from "../";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_SECRET);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  // b122397059ec9834089504a2612b34a3
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_SECRET}`;

  const fetchWeather = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setCity("");
    setLoading(false);
  };
  {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className="">
          {/* overlay */}
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/40 z-[1]" />
          {/* background image */}
          <Image
            src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            layout="fill"
            className="object-cover"
            alt="background image"
          />
          {/* search */}
          <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
            <form
              onSubmit={fetchWeather}
              className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl "
            >
              <div>
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  type="text"
                  placeholder="search city"
                  className="bg-transparent focus:outline-none"
                />
              </div>
              <button type="submit">
                <BsSearch size={20} />
              </button>
            </form>
          </div>
          {/* weather */}
          {weather.main && <Weather data={weather} />}
        </div>
      );
    }
  }
}
