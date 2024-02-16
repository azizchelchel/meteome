import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";
import bg_image from "@/public/assets/images/bg.jpg";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_SECRET}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(URL)
      .then((response) => {
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
        <div className="relative h-screen">
          {/* overlay */}
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-0" />
          {/* background image */}
          <Image
            src={bg_image}
            layout="fill"
            className=" object-cover "
            alt="background image"
          />

          {/* search */}
          <div className="relative  flex  justify-center items-center max-w-[500px] sm:w-screen sm:max-w-prose m-auto  gap-5 py-3  text-white ">
            <button
              // onClick={() => {
              //   signOut();
              // }}
              href="#"
              className="sm:hidden   sm:absolute sm:justify-center sm:left-0 sm:items-center sm:py-3 sm:px-1 sm:text-base sm:text-center sm:text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Logout
              <svg
                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>

            <form
              onSubmit={fetchWeather}
              className=" flex justify-between sm:max-w-[500px] items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl "
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

            <button
              // onClick={() => {
              //   signOut();
              // }}
              href="#"
              // className=" sm:absolute sm:right-1 inline-flex justify-center items-center py-3 px-2 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              className="sm:hidden"
            >
              Logout
              <svg
                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>

          {/* weather */}
          {weather.main && <Weather data={weather} />}
        </div>
      );
    }
  }
}
