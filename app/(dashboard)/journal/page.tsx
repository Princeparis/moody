import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
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
    include: {
      analysis: true,
      user: true,
    },
  })
  return journals
}

const JournalPage = async () => {
  const journals = await getEntries()
  return (
    <div className="p-10 bg-zinc-200/40 h-full overflow-auto">
      <h2 className="text-3xl font-bold mb-8 ">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-4 gap-4">
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
