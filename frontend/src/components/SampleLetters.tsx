import { Card, CardContent } from "@/components/ui/card";

const samples = [
  {
    title: "Birthday Wishes",
    preview: "A heartfelt birthday message with cherished memories",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    title: "Anniversary Love",
    preview: "Celebrating years of love and happiness together",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    title: "Thank You Note",
    preview: "Expressing gratitude with personal touches",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
];

export const SampleLetters = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-secondary">
        Letter Examples
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {samples.map((sample, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img
                src={sample.image}
                alt={sample.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{sample.title}</h3>
                <p className="text-gray-600">{sample.preview}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};