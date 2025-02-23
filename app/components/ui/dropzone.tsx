import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  accept?: string;
}

export function Dropzone({ 
  onFileAccepted, 
  accept = "image/*"
}: DropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onFileAccepted(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFile(e.target.files[0]);
    }
  };

  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative 
        mt-4 
        h-[200px] 
        w-full 
        border-2 
        border-dashed 
        rounded-lg 
        transition-colors
        flex 
        items-center 
        justify-center
        cursor-pointer
        ${isDragActive 
          ? 'border-white/50 bg-white/5' 
          : 'border-white/30 hover:border-white/50'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative w-full h-full">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-contain p-2"
          />
          <button
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Upload className="w-8 h-8 text-white/50 mx-auto mb-2" />
          <p className="text-sm text-white/70">
            {isDragActive ? (
              "Drop the file here"
            ) : (
              "Drag & drop an image or click to select"
            )}
          </p>
        </div>
      )}
    </div>
  );
} 