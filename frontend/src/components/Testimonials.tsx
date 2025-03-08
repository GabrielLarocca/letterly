export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Birthday Letter",
      content: "I created a birthday letter for my sister and she loved it! The music and photos made it so special.",
      image: "/clients/1.jpeg",
    },
    {
      name: "Michael Chen",
      role: "Anniversary Letter",
      content: "The perfect way to express my feelings. The templates helped me write something truly meaningful.",
      image: "/clients/2.jpeg",
    },
    {
      name: "Emma Davis",
      role: "Graduation Letter",
      content: "Created an amazing graduation letter for my best friend. The customization options are incredible!",
      image: "/clients/3.jpeg",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
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