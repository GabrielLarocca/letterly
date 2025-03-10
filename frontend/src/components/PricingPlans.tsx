import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Plan, planService } from "@/services";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

interface PricingPlansProps {
  onSelectPlan: (plan: Plan) => void;
  selectedPlan: Plan | null;
  landingPage?: boolean;
}

export function PricingPlans({
  onSelectPlan,
  selectedPlan,
  landingPage,
}: PricingPlansProps) {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await planService.getAll();

      console.log(plans);
      setPlans(plans);
    };

    fetchPlans();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-center mb-6" id="pricing-heading">
        Escolha seu plano perfeito ✨
      </h2>
      <div
        className="grid md:grid-cols-3 gap-6"
        role="radiogroup"
        aria-labelledby="pricing-heading"
      >
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 ${
              selectedPlan?.name === plan.name
                ? "border-primary border-2"
                : "border-border hover:border-primary/50"
            }`}
            role="radio"
            aria-checked={selectedPlan?.name === plan.name}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelectPlan(plan);
                e.preventDefault();
              }
            }}
            onClick={() => {
              if (!landingPage) {
                onSelectPlan(plan);
              }
            }}
          >
            {plan.name.includes("Padrão") && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  Mais Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold">{formatPrice(plan.price)}</p>
            </div>

            <ul
              className="space-y-3 mb-6"
              aria-label={`Recursos do plano ${plan.name}`}
            >
              {plan.customization.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  {feature ? (
                    <>
                      <Check
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Disponível:</span>
                    </>
                  ) : (
                    <>
                      <X
                        className="h-4 w-4 text-destructive"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Não disponível:</span>
                    </>
                  )}
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {!landingPage && (
              <Button
                type="button"
                onClick={() => onSelectPlan(plan)}
                className={`w-full transform transition-all duration-300 hover:scale-105 ${
                  selectedPlan?.name === plan.name
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                }`}
                aria-label={`${plan.name} - ${plan.price}`}
              >
                Escolher este plano
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
