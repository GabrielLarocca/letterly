import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Music } from "lucide-react";

const suggestedMusic = [
  { title: "Perfect - Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
  { title: "All of Me - John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg" },
  { title: "A Thousand Years - Christina Perri", url: "https://www.youtube.com/watch?v=rtOvBOTyX00" },
];

interface MusicSelectorProps {
  musicUrl: string;
  onMusicChange: (url: string) => void;
  hasMusic: boolean;
}

export function MusicSelector({ musicUrl, onMusicChange, hasMusic }: MusicSelectorProps) {
  if (!hasMusic) return null;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4" id="music-selector-heading">Adicione música de fundo 🎵</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" aria-hidden="true" />
          <Input
            placeholder="Cole a URL do YouTube aqui"
            value={musicUrl}
            onChange={(e) => onMusicChange(e.target.value)}
            aria-labelledby="music-selector-heading"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium" id="suggested-music">Músicas sugeridas:</p>
          <div className="space-y-2" role="list" aria-labelledby="suggested-music">
            {suggestedMusic.map((song) => (
              <button
                key={song.url}
                onClick={() => onMusicChange(song.url)}
                className="block w-full text-left text-sm text-primary hover:text-primary/80 transition-colors"
                role="listitem"
              >
                {song.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}