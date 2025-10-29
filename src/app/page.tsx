"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWeatherData } from "@/lib/getWeather";
import { WeatherData } from "@/types/weather";

// Default city to display on load
const DEFAULT_CITY = "Durham";

// Dynamic greeting based on time
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
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

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load default city weather on mount
    const data = getWeatherData(DEFAULT_CITY);
    if (data) {
      setWeather(data);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20 flex items-center justify-center">
        <div className="text-white/70">Loading your weather...</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20 flex items-center justify-center">
        <div className="text-white/70">Unable to load weather data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-light text-white mb-2" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
                {getGreeting()}
              </h1>
              <p className="text-white/80 text-xl" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
                I'm your Friendly Weather
              </p>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>

        {/* Hero Card */}
        <div className="mb-12">
          <div className="relative group">
            {/* Stacked glass effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-3xl blur opacity-30"></div>
            <div className="absolute -inset-0.5 bg-white/5 rounded-3xl blur-sm"></div>
            
            {/* Main card */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-light text-white mb-2" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
                    {weather.city}
                  </h2>
                  <p className="text-white/70 text-sm">Current conditions</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-thin text-white mb-2" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
                    {weather.current.temperature}°
                  </div>
                  <p className="text-white/80 text-lg">{weather.current.condition.description}</p>
                </div>
              </div>

              {/* Weather details */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-1">Feels like</p>
                  <p className="text-white text-lg font-medium">{weather.current.feelsLike}°F</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-1">Humidity</p>
                  <p className="text-white text-lg font-medium">{weather.current.humidity}%</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-1">Wind</p>
                  <p className="text-white text-lg font-medium">{weather.current.windSpeed} mph</p>
                </div>
              </div>

              {/* Supportive message */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-white/90 text-center" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
                  Light layer is perfect tonight.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
            Here's the next few days...
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weather.forecast.slice(0, 3).map((day, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-white/5 rounded-2xl blur-sm"></div>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-center">
                    <p className="text-white/80 text-sm mb-2 font-medium">{formatDate(day.date)}</p>
                    <div className="text-2xl font-light text-white mb-2" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
                      {day.maxTemp}°/{day.minTemp}°
                    </div>
                    <p className="text-white/70 text-xs">{day.condition.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link 
            href="/dashboard"
            className="group relative inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105"
            style={{ fontFamily: 'Futura, system-ui, sans-serif' }}
          >
            <span className="mr-2">See All Cities</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
