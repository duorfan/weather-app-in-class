export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export const CITIES: City[] = [
  {
    name: "Durham",
    latitude: 35.9940,
    longitude: -78.8986,
  },
  {
    name: "New York",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    name: "Tokyo",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  //new city
  {
    name: "Raleigh",
    latitude: 35.7796,
    longitude: -78.6382,
  },
  {
    name: "Chapel Hill",
    latitude: 35.9132,
    longitude: -79.0558,
  },
  {
    name: "Beijing",
    latitude: 39.9042,
    longitude: 116.4074,
  },
];

export function getCityByName(name: string): City | undefined {
  return CITIES.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
}

export function getRandomCity(): City {
  const randomIndex = Math.floor(Math.random() * CITIES.length);
  return CITIES[randomIndex];
}
