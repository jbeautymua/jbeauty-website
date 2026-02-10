"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminModal from "./AdminModal";
import ConfirmDialog from "./ConfirmDialog";
import { createService, updateService, deleteService } from "@/lib/admin-actions";
import type { Database } from "@/types/database";

type Service = Database["public"]["Tables"]["services"]["Row"];
type CategoryOption = { id: string; name: string };

interface Props {
  services: Service[];
  categories: CategoryOption[];
}

export default function ServicesManager({ services, categories }: Props) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("");

  // Form state
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const openAdd = () => {
    setEditing(null);
    setName("");
    setDuration("");
    setPrice(0);
    setDescription("");
    setCategoryId(categories[0]?.id ?? "");
    setSortOrder(services.length);
    setModalOpen(true);
  };

  const openEdit = (svc: Service) => {
    setEditing(svc);
    setName(svc.name);
    setDuration(svc.duration);
    setPrice(Number(svc.price));
    setDescription(svc.description);
    setCategoryId(svc.category_id);
    setSortOrder(svc.sort_order);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await updateService(editing.id, {
          name, duration, price, description,
          category_id: categoryId, sort_order: sortOrder,
        });
      } else {
        await createService({
          name, duration, price, description,
          category_id: categoryId, sort_order: sortOrder,
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
      await deleteService(deleteTarget.id);
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = filterCategory
    ? services.filter((s) => s.category_id === filterCategory)
    : services;

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border border-border px-3 py-2 text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-lg border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/50">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Order</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Duration</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Price</th>
                <th className="text-right px-6 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((svc) => (
                <tr key={svc.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3 text-muted-foreground">{svc.sort_order}</td>
                  <td className="px-6 py-3 font-medium">{svc.name}</td>
                  <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">
                    {categoryMap[svc.category_id] ?? "—"}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{svc.duration}</td>
                  <td className="px-6 py-3">&pound;{Number(svc.price).toFixed(2)}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(svc)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(svc)}
                        className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Service" : "Add Service"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 30 mins"
                className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Price (&pound;)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
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
              disabled={saving || !name.trim() || !duration.trim() || !categoryId}
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
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        loading={deleting}
      />
    </>
  );
}
