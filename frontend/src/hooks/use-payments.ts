import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services";
import { toast } from "sonner";

export function usePayments() {
  const queryClient = useQueryClient();

  const getPaymentHistory = (userId: number) => 
    useQuery({
      queryKey: ["payments", "history", userId],
      queryFn: () => paymentService.getPaymentHistory(userId),
      enabled: !!userId,
    });

  const createPaymentIntent = useMutation({
    mutationFn: ({ planId, userId, letterId }: { planId: string; userId: number; letterId?: number }) => 
      paymentService.createPaymentIntent(planId, userId, letterId),
    onSuccess: () => {
      toast.success("Intenção de pagamento criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar intenção de pagamento");
    },
  });

  const refundPayment = useMutation({
    mutationFn: ({ paymentId, reason }: { paymentId: number; reason: string }) => 
      paymentService.refundPayment(paymentId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Reembolso solicitado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao solicitar reembolso");
    },
  });

  return {
    getPaymentHistory,
    createPaymentIntent,
    refundPayment,
  };
} 