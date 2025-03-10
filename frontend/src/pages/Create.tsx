import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PricingPlans } from "@/components/PricingPlans";
import { ImageUpload } from "@/components/ImageUpload";
import { EmojiSelector } from "@/components/EmojiSelector";
import { MusicSelector } from "@/components/MusicSelector";
import { useLetters, usePayments } from "@/hooks";
import { toast } from "sonner";
import { LetterPreview } from "@/components/LetterPreview";
import { LetterExample } from "@/components/LetterExample";

const sampleMessages = [
  "Do fundo do meu coração...",
  "Você significa o mundo para mim porque...",
  "Eu nunca vou esquecer quando nós...",
];

const sampleTitles = [
  "Feliz Aniversário!",
  "Obrigado por tudo!",
  "Parabéns pela conquista!",
];

const exampleLetters = [
  {
    title: "Feliz Aniversário!",
    message: "Desejo a você um dia maravilhoso cheio de alegria e surpresas!",
    emoji: "🎂",
    images: [
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
    ],
  },
  {
    title: "Obrigado por tudo!",
    message:
      "Sua amizade significa o mundo para mim. Obrigado por estar sempre ao meu lado.",
    emoji: "❤️",
    images: [
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
    ],
  },
  {
    title: "Parabéns pela conquista!",
    message: "Você merece todo o sucesso do mundo. Continue brilhando!",
    emoji: "🌟",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a",
    ],
  },
];

const Create = () => {
  const navigate = useNavigate();
  const { createLetterWithPhotos } = useLetters();
  const { createPaymentIntent } = usePayments();

  // Estados do formulário
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!title || !message) {
      toast.error("Por favor, preencha o título e a mensagem da sua carta.");
      return;
    }

    if (!selectedPlan) {
      toast.error("Por favor, selecione um plano.");
      return;
    }

    if (!showPreview) {
      console.log("Mostrando preview da carta");
      setShowPreview(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Converter URLs de imagem para arquivos
      const imageFiles = await convertImagesToFiles(images);

      // Criar a carta com fotos
      const letterData = {
        phrase: `${title}\n\n${message}${
          selectedEmoji ? ` ${selectedEmoji}` : ""
        }`,
        backgroundMusicUrl: musicUrl,
      };

      const result = await createLetterWithPhotos.mutateAsync({
        data: letterData,
        photos: imageFiles,
      });

      // Criar intenção de pagamento
      if (result?.id) {
        await createPaymentIntent.mutateAsync({
          planId: selectedPlan.name.toLowerCase(),
          userId: 1,
          letterId: result.id,
        });

        // Redirecionar para a página de visualização
        navigate(`/preview`, {
          state: {
            title,
            message,
            emoji: selectedEmoji,
            musicUrl,
            images,
            plan: selectedPlan,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao criar carta:", error);
      toast.error(
        "Ocorreu um erro ao criar sua carta. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para converter URLs de string para arquivos (simulação)
  const convertImagesToFiles = async (imageUrls: string[]): Promise<File[]> => {
    // Em um caso real, você teria os arquivos originais
    // Esta é uma simulação para o exemplo
    const files: File[] = [];

    for (let i = 0; i < imageUrls.length; i++) {
      try {
        const response = await fetch(imageUrls[i]);
        const blob = await response.blob();
        const file = new File([blob], `image-${i}.jpg`, { type: blob.type });
        files.push(file);
      } catch (error) {
        console.error("Erro ao converter imagem:", error);
      }
    }

    return files;
  };

  const disableByPlan = (plan: string) => {
    if (plan === "Básico") {
      return title === "" || message === "";
    }

    if (plan === "Padrão") {
      return (
        title === "" || message === "" || images.length === 0 || musicUrl === ""
      );
    }

    if (plan === "Premium") {
      return (
        title === "" || message === "" || images.length === 0 || musicUrl === ""
      );
    }

    return false;
  };

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Crie Sua Carta Digital
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Escolha seu plano</h2>
        <PricingPlans
          onSelectPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
      </div>

      {selectedPlan && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              2. Escreva sua mensagem ✍️
            </h2>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                  >
                    Título
                  </label>

                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Feliz Aniversário!"
                    required
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {sampleTitles.map((sample, index) => (
                      <button
                        key={index}
                        type="button"
                        className="text-xs bg-gray-100 hover:bg-gray-200 rounded px-2 py-1"
                        onClick={(e) => {
                          e.preventDefault();
                          setTitle(sample);
                        }}
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Mensagem
                  </label>

                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva sua mensagem especial aqui..."
                    rows={6}
                    required
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {sampleMessages.map((sample, index) => (
                      <button
                        key={index}
                        type="button"
                        className="text-xs bg-gray-100 hover:bg-gray-200 rounded px-2 py-1"
                        onClick={(e) => {
                          e.preventDefault();
                          setMessage(sample);
                        }}
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              3. Adicione elementos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <ImageUpload
                maxImages={selectedPlan?.maxImages || 5}
                images={images}
                onImagesChange={setImages}
              />

              {!selectedPlan.name.includes("Básico") && (
                <>
                  <EmojiSelector
                    selectedEmoji={selectedEmoji}
                    onEmojiSelect={setSelectedEmoji}
                  />

                  <MusicSelector
                    musicUrl={musicUrl}
                    onMusicChange={setMusicUrl}
                    hasMusic={selectedPlan?.name !== "Basic"}
                  />
                </>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Exemplos de Cartas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exampleLetters.map((example, index) => (
                <LetterExample
                  key={index}
                  title={example.title}
                  message={example.message}
                  emoji={example.emoji}
                  images={example.images}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Button
              type="button"
              size="lg"
              className="px-8"
              disabled={isSubmitting || disableByPlan(selectedPlan.name)}
              onClick={handleSubmit}
            >
              {isSubmitting
                ? "Criando..."
                : showPreview
                ? "Confirmar Carta"
                : "Visualizar Carta"}
            </Button>
          </div>
        </>
      )}

      {showPreview && (
        <LetterPreview
          title={title}
          message={message}
          emoji={selectedEmoji}
          images={images}
          musicUrl={musicUrl}
          onConfirm={handleSubmit}
          onCancel={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default Create;
