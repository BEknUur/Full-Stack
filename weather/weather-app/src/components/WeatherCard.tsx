import { Card, CardContent } from "./ui/card";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, condition, icon }) => {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg">
      <CardContent>
        <h2 className="text-2xl font-bold text-gray-800 text-center">{city}</h2>
        <p className="text-4xl font-semibold text-center text-blue-500 my-2">
          {temperature}°C
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={condition}
          className="mx-auto"
        />
        <p className="text-lg text-gray-600 text-center capitalize">{condition}</p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
