"use client";

import Link from "next/link";
import { WeatherCard } from "@/components/WeatherCard";
import { CITIES } from "@/data/cities";
import { getDummyWeatherData } from "@/data/weather-data";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800">
      <div className="px-4 py-6 md:container md:mx-auto md:px-6 md:py-8">
        {/* Header with back link - Mobile First */}
        <div className="mb-6 md:mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200 mb-4"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back Home
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-2" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
            Weather Dashboard
          </h1>
          <p className="text-white/70 text-sm md:text-base">Current conditions across all cities</p>
        </div>

        {/* Weather cards grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {CITIES.map((city) => {
            const weatherData = getDummyWeatherData(city.name);
            if (!weatherData) return null;
            
            return (
              <WeatherCard
                key={city.name}
                city={city.name}
                weather={weatherData.current}
              />
            );
          })}
        </div>

        {/* Back to Home CTA - Mobile Full Width */}
        <div className="flex justify-center">
          <Link 
            href="/"
            className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 md:px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105"
            style={{ fontFamily: 'Futura, system-ui, sans-serif' }}
          >
            <svg 
              className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
