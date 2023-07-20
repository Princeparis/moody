import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const journals = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return journals
}

const JournalPage = async () => {
  const journals = await getEntries()
  return (
    <div className="p-10 bg-zinc-200/40 h-full">
      <h2 className="text-3xl font-bold mb-8 ">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {journals.map((journal) => (
          <Link href={`/journal/${journal.id}`} key={journal.id}>
            <EntryCard entry={journal} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
