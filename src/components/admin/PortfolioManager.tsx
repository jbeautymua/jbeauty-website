"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import AdminModal from "./AdminModal";
import ConfirmDialog from "./ConfirmDialog";
import ImageUpload from "./ImageUpload";
import {
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  uploadPortfolioImage,
} from "@/lib/admin-actions";
import type { Database } from "@/types/database";

type PortfolioItem = Database["public"]["Tables"]["portfolio_items"]["Row"];

interface Props {
  items: PortfolioItem[];
}

export default function PortfolioManager({ items }: Props) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gradientFrom, setGradientFrom] = useState("#EDE8E3");
  const [gradientTo, setGradientTo] = useState("#E0D9D3");
  const [sortOrder, setSortOrder] = useState(0);

  const openAdd = () => {
    setEditing(null);
    setTitle("");
    setCategory("");
    setImageUrl("");
    setGradientFrom("#EDE8E3");
    setGradientTo("#E0D9D3");
    setSortOrder(items.length);
    setModalOpen(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditing(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.image_url);
    setGradientFrom(item.gradient_from);
    setGradientTo(item.gradient_to);
    setSortOrder(item.sort_order);
    setModalOpen(true);
  };

  const handleUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadPortfolioImage(formData);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await updatePortfolioItem(editing.id, {
          title, category, image_url: imageUrl,
          gradient_from: gradientFrom, gradient_to: gradientTo,
          sort_order: sortOrder,
        });
      } else {
        await createPortfolioItem({
          title, category, image_url: imageUrl,
          gradient_from: gradientFrom, gradient_to: gradientTo,
          sort_order: sortOrder,
        });
      }
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deletePortfolioItem(deleteTarget.id);
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-border/50 shadow-sm overflow-hidden"
          >
            <div
              className="aspect-video relative"
              style={{
                background: item.image_url
                  ? undefined
                  : `linear-gradient(135deg, ${item.gradient_from}, ${item.gradient_to})`,
              }}
            >
              {item.image_url && (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
            No portfolio items yet.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Portfolio Item" : "Add Portfolio Item"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Bridal, Lashes"
              className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Image</label>
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              onUpload={handleUpload}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Sort Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !title.trim() || !category.trim()}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Portfolio Item"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        loading={deleting}
      />
    </>
  );
}
