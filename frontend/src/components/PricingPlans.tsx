import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Básico",
    price: "R$5,00",
    features: [
      { name: "Até 5 fotos", available: true },
      { name: "Personalização básica", available: true },
      { name: "Acesso por 1 ano", available: true },
      { name: "Música de fundo", available: false },
      { name: "Efeitos de emojis", available: false },
    ],
    maxImages: 5,
    buttonText: "Escolher Básico",
    popular: false,
  },
  {
    name: "Padrão",
    price: "R$10,00",
    features: [
      { name: "Até 15 fotos", available: true },
      { name: "Personalização aprimorada", available: true },
      { name: "Acesso por 3 anos", available: true },
      { name: "Música de fundo", available: true },
      { name: "Efeitos de emojis básicos", available: true },
    ],
    maxImages: 15,
    buttonText: "Escolher Padrão",
    popular: true,
  },
  {
    name: "Premium",
    price: "R$12,00",
    features: [
      { name: "Fotos ilimitadas", available: true },
      { name: "Personalização avançada", available: true },
      { name: "Acesso vitalício", available: true },
      { name: "Biblioteca de músicas premium", available: true },
      { name: "Efeitos de emojis avançados", available: true },
      { name: "Suporte prioritário", available: true },
    ],
    maxImages: 999,
    buttonText: "Escolher Premium",
    popular: false,
  },
];

interface PricingPlansProps {
  onSelectPlan: (plan: typeof plans[0]) => void;
  selectedPlan: typeof plans[0] | null;
}

export function PricingPlans({ onSelectPlan, selectedPlan }: PricingPlansProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">Escolha seu plano perfeito ✨</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 ${
              selectedPlan?.name === plan.name
                ? "border-primary border-2"
                : "border-border hover:border-primary/50"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  Mais Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold">{plan.price}</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-2">
                  {feature.available ? (
                    <span className="text-primary">✓</span>
                  ) : (
                    <span className="text-destructive">✗</span>
                  )}
                  <span className="text-sm">{feature.name}</span>
                </li>
              ))}
            </ul>

            <Button 
              type="button"
              onClick={() => onSelectPlan(plan)}
              className={`w-full transform transition-all duration-300 hover:scale-105 ${
                selectedPlan?.name === plan.name ? "bg-primary hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              }`}
            >
              {plan.buttonText}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}