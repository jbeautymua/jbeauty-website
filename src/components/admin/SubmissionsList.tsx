"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { deleteSubmission, deleteSubmissions } from "@/lib/admin-actions";
import type { Database } from "@/types/database";

type Submission = Database["public"]["Tables"]["contact_submissions"]["Row"];

interface Props {
  submissions: Submission[];
}

export default function SubmissionsList({ submissions }: Props) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Submission | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const allSelected = submissions.length > 0 && selected.size === submissions.length;

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(submissions.map((s) => s.id)));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSubmission(deleteTarget.id);
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.id);
        return next;
      });
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    setDeleting(true);
    try {
      await deleteSubmissions(Array.from(selected));
      setSelected(new Set());
      setBulkDeleteOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 mb-4 bg-white rounded-lg border border-border/50 shadow-sm px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {selected.size} selected
          </span>
          <button
            onClick={() => setBulkDeleteOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Selected
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg border border-border/50 shadow-sm overflow-hidden">
        {submissions.length > 0 ? (
          <div className="divide-y divide-border/50">
            {/* Select all header */}
            <div className="flex items-center gap-3 px-6 py-3 bg-secondary/50">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
              />
              <span className="text-xs font-medium text-muted-foreground">
                Select all
              </span>
            </div>

            {submissions.map((sub) => {
              const expanded = expandedId === sub.id;
              const isSelected = selected.has(sub.id);
              return (
                <div key={sub.id} className={isSelected ? "bg-primary/[0.03]" : ""}>
                  <div className="flex items-center gap-3 px-6 py-4 hover:bg-secondary/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(sub.id)}
                      className="w-4 h-4 rounded border-border accent-primary cursor-pointer shrink-0"
                    />
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
                      onClick={() => setExpandedId(expanded ? null : sub.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-0.5">
                          <span className="font-medium text-sm">{sub.name}</span>
                          <span className="text-xs text-muted-foreground">{sub.email}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{sub.message}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {new Date(sub.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(sub);
                          }}
                          className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {expanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                  {expanded && (
                    <div className="px-6 pb-4 pl-[3.25rem] bg-secondary/20">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name: </span>
                          <span className="font-medium">{sub.name}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email: </span>
                          <a href={`mailto:${sub.email}`} className="font-medium text-primary hover:underline">
                            {sub.email}
                          </a>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone: </span>
                          <span className="font-medium">{sub.phone || "—"}</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground block mb-1">Message:</span>
                        <p className="whitespace-pre-wrap">{sub.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-muted-foreground text-sm">
            No submissions yet.
          </div>
        )}
      </div>

      {/* Single delete */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Submission"
        message={`Are you sure you want to delete the submission from "${deleteTarget?.name}"?`}
        loading={deleting}
      />

      {/* Bulk delete */}
      <ConfirmDialog
        open={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        title="Delete Selected Submissions"
        message={`Are you sure you want to delete ${selected.size} submission${selected.size === 1 ? "" : "s"}? This cannot be undone.`}
        loading={deleting}
      />
    </>
  );
}
