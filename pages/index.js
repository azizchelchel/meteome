import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";
export default function Home() {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=algiers&appid=${process.env.PUBLIC_OPENWEATHERAPP_API_KEY}`;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(URL).then((response) => {
      console.log(response.data);
      setWeather(response.data);
    });
    setCity("");
    setLoading(false);
  };
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        layout="fill"
        className="object-cover"
      />
    </div>
  );
}
