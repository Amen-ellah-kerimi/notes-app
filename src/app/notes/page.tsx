import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getNotes } from "@/actions/noteActions";
import NotesList from "@/components/NotesList";
import CreateNoteForm from "@/components/CreateNoteForm";

export default async function NotesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const notes = await getNotes();

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-500">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Notes</h1>
          <div className="text-sm text-gray-600">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CreateNoteForm />
          </div>

          <div className="lg:col-span-2">
            <NotesList notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
}
