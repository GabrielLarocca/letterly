export interface LetterAttributes {
  id: number;
  userId: number;
  planId?: number | null;
  phrase: string;
  font?: string;
  colorScheme?: string;
  animation?: string;
  backgroundMusicUrl?: string;
  uniqueLink: string;
  qrCode?: string;
  expiryDate?: Date | null;
}
