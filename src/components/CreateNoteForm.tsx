"use client";

import { createNote } from "@/actions/noteActions";
import { useState } from "react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function CreateNoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createNote(formData);
    } catch (error) {
      // Check if this is a redirect error (successful creation)
      if (isRedirectError(error)) {
        // Re-throw redirect errors to allow navigation to proceed
        throw error;
      }

      // Handle actual errors
      console.error("Failed to create note:", error);
      alert("Failed to create note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl text-black font-semibold mb-4">Create New Note</h2>
      
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
            placeholder="Enter note title"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={6}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
            placeholder="Write your note content here..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
}
