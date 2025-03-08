import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const emojis = ["🎉", "🎂", "❤️", "🎄", "🌟", "🎁", "🎨", "✨", "🌈", "🎵", "🌺", "💝"];

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiSelector({ selectedEmoji, onEmojiSelect }: EmojiSelectorProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Adicione um pouco de brilho ✨</h3>
      <div className="grid grid-cols-4 gap-2">
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
          >
            {emoji}
          </Button>
        ))}
      </div>
    </Card>
  );
}