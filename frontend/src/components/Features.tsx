import { Heart, Clock, Globe, Sparkles } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Compartilhe com seus amigos",
      description: "Compartilhe sua carta com seus amigos e familiares.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Memórias eternas",
      description: "Crie cartas que podem ser apreciadas para sempre.",
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Compartilhe em qualquer lugar",
      description: "Envie suas cartas para seus amigos em qualquer lugar do mundo.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Designs incríveis",
      description: "Escolha de templates incríveis e opções de personalização.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Por que cartas digitais?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};