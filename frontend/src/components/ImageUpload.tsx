import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  maxImages: number;
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function ImageUpload({ maxImages, images, onImagesChange }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      alert(`Você só pode carregar até ${maxImages} imagens com seu plano atual`);
      return;
    }
    
    const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
    onImagesChange([...images, ...newImages]);
  }, [images, maxImages, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Adicione suas fotos especiais ✨</h3>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
        }`}
        role="button"
        tabIndex={0}
        aria-label="Área para upload de imagens. Clique ou arraste arquivos para cá."
      >
        <input {...getInputProps()} aria-label="Upload de imagens" />
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" aria-hidden="true" />
        <p className="text-sm text-gray-600">
          {isDragActive
            ? "Solte suas fotos aqui..."
            : "Arraste e solte suas fotos aqui, ou clique para selecionar"}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {images.length}/{maxImages} imagens usadas
        </p>
      </div>

      {images.length > 0 && (
        <div 
          className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          role="list"
          aria-label="Imagens carregadas"
        >
          {images.map((image, index) => (
            <div key={index} className="relative group" role="listitem">
              <img
                src={image}
                alt={`Imagem carregada ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remover imagem ${index + 1}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}