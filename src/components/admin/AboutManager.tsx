"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { updateBusinessInfo, uploadPortfolioImage } from "@/lib/admin-actions";

interface Props {
  currentImageUrl: string;
}

export default function AboutManager({ currentImageUrl }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadPortfolioImage(formData);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateBusinessInfo({ about_image_url: imageUrl });
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border/50 shadow-sm p-6 max-w-lg">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            About Section Image
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            This image appears in the &ldquo;Our Story&rdquo; section on the About page.
          </p>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            onUpload={handleUpload}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
