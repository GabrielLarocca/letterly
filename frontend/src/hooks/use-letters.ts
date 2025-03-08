import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { letterService, CreateLetterDto, Letter } from "@/services";
import { toast } from "sonner";

export function useLetters() {
  const queryClient = useQueryClient();

  const getLetters = useQuery({
    queryKey: ["letters"],
    queryFn: letterService.getAll,
  });

  const getUserLetters = (userId: number) => 
    useQuery({
      queryKey: ["letters", "user", userId],
      queryFn: () => letterService.getUserLetters(userId),
      enabled: !!userId,
    });

  const getLetter = (id: number) => 
    useQuery({
      queryKey: ["letters", id],
      queryFn: () => letterService.getById(id),
      enabled: !!id,
    });

  const getLetterByLink = (uniqueLink: string) => 
    useQuery({
      queryKey: ["letters", "link", uniqueLink],
      queryFn: () => letterService.getByUniqueLink(uniqueLink),
      enabled: !!uniqueLink,
    });

  const createLetter = useMutation({
    mutationFn: (data: CreateLetterDto) => letterService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      toast.success("Carta criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar carta");
    },
  });

  const createLetterWithPhotos = useMutation({
    mutationFn: ({ data, photos }: { data: CreateLetterDto; photos: File[] }) => 
      letterService.createWithPhotos(data, photos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      toast.success("Carta com fotos criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar carta com fotos");
    },
  });

  const updateLetter = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateLetterDto> }) => 
      letterService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      queryClient.invalidateQueries({ queryKey: ["letters", data.id] });
      toast.success("Carta atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar carta");
    },
  });

  const deleteLetter = useMutation({
    mutationFn: (id: number) => letterService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      toast.success("Carta excluída com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir carta");
    },
  });

  return {
    getLetters,
    getUserLetters,
    getLetter,
    getLetterByLink,
    createLetter,
    createLetterWithPhotos,
    updateLetter,
    deleteLetter,
  };
} 