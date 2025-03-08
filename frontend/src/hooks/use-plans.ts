import { useQuery } from "@tanstack/react-query";
import { planService } from "@/services";

export function usePlans() {
  const getPlans = useQuery({
    queryKey: ["plans"],
    queryFn: planService.getAll,
  });

  const getPlan = (id: number) => 
    useQuery({
      queryKey: ["plans", id],
      queryFn: () => planService.getById(id),
      enabled: !!id,
    });

  return {
    getPlans,
    getPlan,
  };
} 