import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const emojis = ["🎉", "🎂", "❤️", "🎄", "🌟", "🎁", "🎨", "✨", "🌈", "🎵", "🌺", "💝"];
const emojiDescriptions: Record<string, string> = {
  "🎉": "Emoji de festa",
  "🎂": "Emoji de bolo de aniversário",
  "❤️": "Emoji de coração vermelho",
  "🎄": "Emoji de árvore de Natal",
  "🌟": "Emoji de estrela brilhante",
  "🎁": "Emoji de presente",
  "🎨": "Emoji de paleta de pintura",
  "✨": "Emoji de brilhos",
  "🌈": "Emoji de arco-íris",
  "🎵": "Emoji de nota musical",
  "🌺": "Emoji de flor",
  "💝": "Emoji de coração com fita"
};

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiSelector({ selectedEmoji, onEmojiSelect }: EmojiSelectorProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Adicione um pouco de brilho ✨</h3>
      <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Selecione um emoji">
        {emojis.map((emoji) => (
          <Button
            key={emoji}
            variant="outline"
            className={`text-2xl h-12 ${
              selectedEmoji === emoji
                ? "border-primary border-2"
                : "hover:border-primary/50"
            }`}
            type="button"
            onClick={() => onEmojiSelect(emoji)}
            aria-label={emojiDescriptions[emoji] || `Emoji ${emoji}`}
            aria-pressed={selectedEmoji === emoji}
            role="radio"
          >
            <span aria-hidden="true">{emoji}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}