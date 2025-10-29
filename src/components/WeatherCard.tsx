import { CurrentWeather } from "@/types/weather";

interface WeatherCardProps {
  city: string;
  weather: CurrentWeather;
}

export function WeatherCard({ city, weather }: WeatherCardProps) {
  return (
    <div className="relative group">
      {/* Soft glow effect */}
      <div className="absolute -inset-0.5 bg-white/5 rounded-2xl blur-sm"></div>
      
      {/* Main card */}
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-105">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* City name */}
          <h2 className="text-lg md:text-xl font-light text-white mb-3" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
            {city}
          </h2>
          
          {/* Temperature - large and prominent */}
          <div className="mb-4">
            <span className="text-3xl md:text-4xl font-thin text-white" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
              {weather.temperature}°
            </span>
            <span className="text-white/70 text-sm md:text-lg ml-1">F</span>
          </div>
          
          {/* Condition description */}
          <p className="text-white/90 text-sm mb-4 font-medium">{weather.condition.description}</p>
          
          {/* Weather details grid */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-white/70">Humidity</span>
              <span className="text-white font-medium">{weather.humidity}%</span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-white/70">Wind</span>
              <span className="text-white font-medium">{weather.windSpeed} mph</span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-white/70">Feels like</span>
              <span className="text-white font-medium">{weather.feelsLike}°F</span>
            </div>
          </div>
        </div>
        
        {/* Soft radial glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}
