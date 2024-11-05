import { useEffect, useState } from "react";
import weather from "./assets/cloudy.png";
import palette from "./assets/palette.png";
import search_icon from "./assets/search.png";
import { fetchWeatherData } from "./index";

function App() {
  const [cityName, setCityName] = useState("Mumbai");
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    name: "Mumbai",
    main: {
      temp: 302.14,
      feels_like: 309.14,
      humidity: 66,
      pressure: 1011,
      sea_level: 1011,
      grnd_level: 1010,
    },
    coord: {
      lat: 19.0144,
      lon: 72.8479,
    },
    wind: {
      speed: 3.09,
    },
    weather: [
      {
        main: "Haze",
        description: "haze",
      },
    ],
  });

  const handleSearch = async () => {
    if (!search) return; // Prevent empty searches
    const response = await fetchWeatherData(search); // Fetch data using the search term
    if (response) {
      setData(response); // Update the state with the fetched data
    } else {
      console.error("Failed to fetch data");
    }
    setCityName(search); // Update cityName to the current search input
    setSearch(""); // Clear the search input
  };

  const [theme, setTheme] = useState("color");

  const ChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "color" ? "clean" : "color"));
  };

  const convertToCelsius = (value) => {
    return (value - 273.15).toFixed(0); // Convert Kelvin to Celsius
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-800 overflow-hidden">
      <div
        className="md:w-[600px] lg:w-[800px] lg:h-[600px]
        bg-white text-slate-900 p-4 md:p-6 lg:p-10 grid grid-cols-6 lg:grid-rows-6 gap-1 md:gap-2 font-bold font-serif rounded-lg lg:shadow-xl lg:shadow-gray-700"
      >
        <div
          className={`flex flex-row justify-between items-center p-2 lg:p-4 ${
            theme === "color"
              ? "bg-rose-400"
              : " bg-white border-2  lg:border-4  border-gray-700"
          } col-span-5 lg:col-span-4 rounded-lg shadow-md lg:shadow-gray-400`}
        >
          <input
            type="text"
            placeholder="search city"
            className={`${
              theme === "color" ? "bg-rose-400" : ""
            } placeholder:text-slate-900 text-[12px] md:text-[14px] lg:text-base  px-2 py-2 md: lg:py-2 focus:outline-none`}
            onChange={(e) => setSearch(e.target.value)}
            value={search} // Bind input value to state
          />
          <button className="p-2" onClick={handleSearch}>
            <img src={search_icon} className="w-4" alt="Search" />
          </button>
        </div>
        <div className="grid grid-cols-3 justify-between items-center gap-1 lg:col-span-2 rounded-lg">
          <p
            className={`hidden lg:col-span-2 lg:flex lg:py-2 ${
              theme === "color"
                ? "bg-green-400 p-5"
                : "border-2 lg:border-4 border-gray-600 p-4"
            } text-lg text-center rounded-lg shadow-md shadow-gray-400`}
          >
            Tuesday 09:34
          </p>
          <button
            onClick={ChangeTheme}
            className={`cursor-pointer flex justify-center col-span-3 lg:col-span-1 ${
              theme === "color"
                ? "bg-white border-2 border-gray-500  lg:border-4 lg:border-gray-700 py-3"
                : "bg-amber-400 py-3 lg:py-5"
            }  lg:py-4  text-xl text-center rounded-lg shadow-md lg:shadow-gray-700`}
          >
            <img src={palette} className="w-6 lg:w-8 " alt="Change Theme" />
          </button>
        </div>
        <div
          className={`row-span-1 col-span-4 lg:col-span-4 lg:row-span-2 flex flex-col justify-center gap-1 p-4 lg:p-8 ${
            theme === "color"
              ? "bg-lime-400"
              : "bg-white border-2 lg:border-4 border-gray-700"
          }  rounded-lg shadow-md lg:shadow-gray-400`}
        >
          <h1 className="text-xl ml-2 lg:text-4xl text-left">
            {data.name || cityName || "Mumbai"} {/* Display city name */}
          </h1>
          <p className="text-base ml-2 lg:text-2xl">
            {data.weather[0]?.description}
          </p>
        </div>
        <div
          className={`flex justify-center items-center ${
            theme === "color"
              ? "bg-cyan-400"
              : "bg-white border-2 lg:border-4 border-gray-700"
          } row-span-1 lg:row-span-2 col-span-2 rounded-lg shadow-md lg:shadow-gray-400`}
        >
          <p className="text-4xl lg:text-7xl lg:mb-6">
            {convertToCelsius(data.main.temp)}°
          </p>
        </div>
        <div
          className={`flex flex-col md:flex-row xl:flex-row  gap-1 md:gap-6 justify-center items-center md:py-2 lg:py-0 ${
            theme === "color"
              ? "bg-fuchsia-400"
              : "bg-white border-2 lg:border-4 border-gray-700"
          } col-span-3 md:col-span-6  lg:col-span-4 text-[11px] md:text-base lg:text-lg  rounded-lg shadow-md`}
        >
          <p>Longitude: {data.coord.lon}</p>
          <p>Latitude: {data.coord.lat}</p>
        </div>

        <div
          className={`flex flex-col justify-center items-center p-2 ${
            theme === "color"
              ? "bg-gray-100"
              : "bg-white border-2 lg:border-4 border-gray-700"
          } col-span-3 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-3 rounded-lg shadow-md lg:shadow-gray-400`}
        >
          <img src={weather} className="w-[60px] md:w-[100px] lg:w-[140px]" />
        </div>
        <div
          className={`col-span-6 md:col-span-4 md:row-span-2  flex flex-col gap-2 p-6 lg:p-8 ${
            theme === "color"
              ? "bg-yellow-400"
              : "bg-white border-2 lg:border-4 border-gray-700"
          } grid grid-cols-2 rounded-lg text-[12px] md:text-sm lg:text-lg shadow-md lg:shadow-gray-400`}
        >
          <p>Temperature: {convertToCelsius(data.main.temp)}°</p>
          <p>Feels Like: {convertToCelsius(data.main.feels_like)}°</p>
          <p>Humidity: {data.main.humidity}</p>
          <p>Pressure: {data.main.pressure}</p>
          <p>Wind Speed: {data.wind.speed}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
