import { notFound } from "next/navigation";
import { getWeatherData } from "@/lib/getWeather";
import { CITIES } from "@/data/cities";
import { CurrentWeatherDetail } from "@/components/CurrentWeatherDetail";
import { ForecastCard } from "@/components/ForecastCard";
import { Button } from "@/components/ui/Button";

/**
 * Detailed Weather Page
 *
 * Dynamic route that displays comprehensive weather information
 * for a specific city including current conditions and forecast
 */

interface PageProps {
  params: Promise<{
    location: string;
  }>;
}

export default async function WeatherDetailPage({ params }: PageProps) {
  const { location } = await params;
  const cityName = decodeURIComponent(location);

  // Validate city exists in our list
  const cityExists = CITIES.some(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityExists) {
    notFound();
  }

  // Fetch weather data
  const weather = getWeatherData(cityName);

  if (!weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
            Weather data unavailable
          </h1>
          <Button href="/" variant="default">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20">
      <div className="px-4 py-6 md:container md:mx-auto md:px-6 md:py-8">
        <main className="max-w-4xl mx-auto space-y-8">
          {/* Header with back button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-0" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
              {weather.city}
            </h1>
            <Button href="/" variant="ghost">
              ← Back to Home
            </Button>
          </div>

        {/* Current weather - Large display */}
        <CurrentWeatherDetail
          current={weather.current}
          latitude={weather.latitude}
          longitude={weather.longitude}
        />

        {/* 3-Day Forecast */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-light text-white" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
            3-Day Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weather.forecast.slice(0, 3).map((day, index) => (
              <ForecastCard key={index} forecast={day} />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <Button href="/" variant="default">
            Search Another City
          </Button>
        </div>
        </main>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { location } = await params;
  const cityName = decodeURIComponent(location);

  return {
    title: `${cityName} Weather - Weather App`,
    description: `Detailed weather forecast for ${cityName}`,
  };
}
