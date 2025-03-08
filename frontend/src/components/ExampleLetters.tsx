import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const examples = [
  {
    title: "Christmas Letter",
    preview: "Share the joy and warmth of the holiday season",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf",
    theme: {
      title: "Merry Christmas!",
      message: "Wishing you a magical and joyful Christmas season filled with warmth and happiness. May this special time of year bring you countless blessings and beautiful moments to cherish.",
      emoji: "🎄",
      musicUrl: "https://www.youtube.com/watch?v=aAkMkVFwAoo",
    },
  },
  {
    title: "Promotion Letter",
    preview: "Celebrate career achievements and success",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093",
    theme: {
      title: "Congratulations on Your Promotion!",
      message: "Your hard work, dedication, and perseverance have paid off. This promotion is a testament to your incredible skills and leadership. Here's to your continued success!",
      emoji: "🎉",
      musicUrl: "https://www.youtube.com/watch?v=CTE6nXQb-Bo",
    },
  },
  {
    title: "Birthday Letter",
    preview: "Send heartfelt birthday wishes to loved ones",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d",
    theme: {
      title: "Happy Birthday!",
      message: "On your special day, I want to remind you how much joy and happiness you bring to everyone around you. May this year bring you endless reasons to smile!",
      emoji: "🎂",
      musicUrl: "https://www.youtube.com/watch?v=MjxGwfa5lxw",
    },
  },
  {
    title: "Love Letter",
    preview: "Express your deepest feelings and emotions",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    theme: {
      title: "To My Love",
      message: "Every moment spent with you feels like a beautiful dream. Your love fills my heart with joy and makes every day brighter. You mean the world to me.",
      emoji: "❤️",
      musicUrl: "https://www.youtube.com/watch?v=450p7goxZqg",
    },
  },
];

export const ExampleLetters = () => {
  const navigate = useNavigate();

  const handleCardClick = (theme: typeof examples[0]["theme"]) => {
    navigate("/preview", { state: theme });
  };

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Letter Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {examples.map((example, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(example.theme)}
          >
            <CardContent className="p-0">
              <img
                src={example.image}
                alt={example.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                <p className="text-gray-600">{example.preview}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};