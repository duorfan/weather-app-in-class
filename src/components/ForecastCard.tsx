import { DailyForecast } from "@/types/weather";

interface ForecastCardProps {
  forecast: DailyForecast;
}

// Format date for forecast
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="relative group">
      {/* Soft glow effect */}
      <div className="absolute -inset-0.5 bg-white/5 rounded-2xl blur-sm"></div>
      
      {/* Main card */}
      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
        <div className="text-center">
          <p className="text-white/80 text-sm mb-2 font-medium" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
            {formatDate(forecast.date)}
          </p>
          <div className="text-xl md:text-2xl font-light text-white mb-2" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
            {forecast.maxTemp}°/{forecast.minTemp}°
          </div>
          <p className="text-white/70 text-xs">{forecast.condition.description}</p>
        </div>
      </div>
    </div>
  );
}