import Dashboard from "@/components/layout/Dashboard";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NotebookPenIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useAllNote } from "@/store/data";
import { FormEvent, useEffect } from "react";
import { deleteNotes, getNotes, postNotes } from "@/lib/action";
import { Link } from "react-router-dom";
import { FormStore } from "@/store/form";

const DashboardPage = () => {
  const isLoaded = true;
  let session: any;
  const { notes, setNotes } = useAllNote();
  const { loading, isLoading } = FormStore.loadingStore();
  const { submitType, setSubmitType } = FormStore.submitTypeStore();
  const { selectId, setSelectedId } = FormStore.selectIdStore();
  const newId = notes.length + 1;

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded) {
        isLoading(true);
      }
      await getNotes().then((data) => setNotes(data!));
      isLoading(false);
    };
    fetchData().catch(console.error);
    return;
  }, []);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (submitType) {
      case "create":
        setNotes([
          ...notes,
          {
            id: newId.toString(),
            title: "New Note",
            content: "",
            user: session?.user.fullName,
            userId: session?.user.id,
          },
        ]);
        postNotes({
          id: newId.toString(),
          title: "New Note",
          content: "",
          user: session?.user.fullName,
          userId: session?.user.id,
        });
        break;
      case "delete":
        deleteNotes(selectId);
        setNotes([...notes.filter((n) => n.id !== selectId)]);
        break;
      default:
        break;
    }
  };

  return (
    <Dashboard>
      <Layout>
        {loading ? (
          <Skeleton className="m-10 h-full" />
        ) : (
          <form onSubmit={handleForm} className="p-10">
            <div className="flex gap-4">
              <h1 className="font-bold text-2xl">Home</h1>
              <Button
                type="submit"
                variant="outline"
                className="gap-2"
                onClick={() => setSubmitType("create")}
              >
                Create Note <PlusCircleIcon size={20} />
              </Button>
            </div>
            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes
                .filter((note) => note.userId === session?.user.id)
                .map((note) => (
                  <Card key={note.id} className="w-full">
                    <CardHeader>
                      <CardTitle>{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent
                      className="my-4 prose dark:prose-invert w-full h-[160px] overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: note.content! }}
                    />
                    <CardFooter className="flex justify-between gap-2">
                      <Button
                        type="submit"
                        variant="destructive"
                        className="w-full gap-2"
                        onClick={() => {
                          setSubmitType("delete");
                          setSelectedId(note.id!);
                        }}
                      >
                        <TrashIcon size={20} />
                        Delete
                      </Button>
                      <Button type="button" className="w-full" asChild>
                        <Link
                          to={`/dashboard/note/${note.id}`}
                          className="flex gap-2"
                        >
                          <NotebookPenIcon size={20} /> Edit
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </form>
        )}
      </Layout>
    </Dashboard>
  );
};

export default DashboardPage;
