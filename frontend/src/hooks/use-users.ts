import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService, CreateUserDto } from "@/services";
import { toast } from "sonner";

export function useUsers() {
  const queryClient = useQueryClient();

  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const getUser = (id: number) => 
    useQuery({
      queryKey: ["users", id],
      queryFn: () => userService.getById(id),
      enabled: !!id,
    });

  const createUser = useMutation({
    mutationFn: (data: CreateUserDto) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar usuário");
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateUserDto> }) => 
      userService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", data.id] });
      toast.success("Usuário atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar usuário");
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir usuário");
    },
  });

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
} 