import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getJournal = async (id) => {
  const user = await getUserByClerkID();
  const journal = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
};

const EntryPage = ({ params }) => {
  return (
    <div>
      <Editor />
    </div>
  );
};

export default EntryPage;
