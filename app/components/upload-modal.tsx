import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Dropzone } from "@/app/components/ui/dropzone";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
  title?: string;
}

export function UploadModal({ 
  isOpen, 
  onClose, 
  onUpload, 
  title = "Upload Image" 
}: UploadModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      await onUpload(selectedFile);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#21202D] text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <Dropzone
          onFileAccepted={(file) => setSelectedFile(file)}
        />

        <div className="flex items-center gap-2 mt-4">
          <button
            className="flex-1 h-12 bg-white/10 hover:bg-white/20 text-white rounded-[20px] transition-colors"
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            className="flex-1 h-12 bg-[#EEEBFF] hover:bg-[#EEEBFF]/90 text-black rounded-[20px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 