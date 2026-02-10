"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { deleteSubmission } from "@/lib/admin-actions";
import type { Database } from "@/types/database";

type Submission = Database["public"]["Tables"]["contact_submissions"]["Row"];

interface Props {
  submissions: Submission[];
}

export default function SubmissionsList({ submissions }: Props) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Submission | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSubmission(deleteTarget.id);
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
      <div className="bg-white rounded-lg border border-border/50 shadow-sm overflow-hidden">
        {submissions.length > 0 ? (
          <div className="divide-y divide-border/50">
            {submissions.map((sub) => {
              const expanded = expandedId === sub.id;
              return (
                <div key={sub.id}>
                  <div
                    className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-secondary/30 transition-colors"
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
                  {expanded && (
                    <div className="px-6 pb-4 bg-secondary/20">
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

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Submission"
        message={`Are you sure you want to delete the submission from "${deleteTarget?.name}"?`}
        loading={deleting}
      />
    </>
  );
}
