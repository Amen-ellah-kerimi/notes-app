"use client";

import { deleteNote } from "@/actions/noteActions";
import { useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
  slug: string | null;
  ownerId: string;
  created_at: Date;
  updated_at: Date;
}

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    setDeletingId(id);
    try {
      await deleteNote(id);
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
          <p className="text-gray-500">Create your first note to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
            <button
              onClick={() => handleDelete(note.id)}
              disabled={deletingId === note.id}
              className="text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
          
          <p className="text-gray-700 mb-4 whitespace-pre-wrap">{note.content}</p>
          
          <div className="text-sm text-gray-500 flex justify-between">
            <span>Created: {new Date(note.created_at).toLocaleDateString()}</span>
            <span>Updated: {new Date(note.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
