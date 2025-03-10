export const Testimonials = () => {
  const testimonials = [
    {
      name: "Milena Rodrigues",
      role: "Carta de Aniversário",
      content:
        "Criei uma carta de aniversário para minha irmã e ela adorou! A música e as fotos tornaram tudo mais especial.",
      image: "/clients/1.jpeg",
    },
    {
      name: "Jonas Silva",
      role: "Carta de Amor",
      content:
        "O jeito perfeito de expressar meus sentimentos. Os templates me ajudaram a escrever algo realmente significativo.",
      image: "/clients/2.jpeg",
    },
    {
      name: "Ana Oliveira",
      role: "Carta de Formatura",
      content:
        "Criei uma carta de formatura incrível para meu melhor amigo. As opções de customização são incríveis!",
      image: "/clients/3.jpeg",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          O que nossos usuários falam
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
