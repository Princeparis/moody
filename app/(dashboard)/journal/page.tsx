import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntries = async () => {
  const user = await getUserByClerkID();
  const journals = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return journals;
};

const JournalPage = async () => {
  const journals = await getEntries();
  return (
    <div className="p-10 bg-zinc-200/40 h-full">
      <h2 className="text-3xl font-bold mb-8 ">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {journals.map((journal) => (
          <EntryCard key={journal.id} entry={journal} />
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
