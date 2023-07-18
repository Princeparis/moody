import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getJournal = async (id: string) => {
  const user = await getUserByClerkID();
  const journal = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });
  return journal;
};

const EntryPage = async ({ params }) => {
  const journal = await getJournal(params.id);
  return (
    <div className="h-full w-full">
      <Editor journal={journal} />
    </div>
  );
};

export default EntryPage;
