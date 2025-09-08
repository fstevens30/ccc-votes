import { prisma } from '@/lib/prisma'
import CouncillorsTable, { CouncillorRow } from '@/components/CouncillorTable'

// Server Component
export default async function CouncillorsPage () {
  const councillorsData = await prisma.councillor.findMany({
    include: {
      ward: true,
      party: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  const councillors: CouncillorRow[] = councillorsData.map(c => ({
    id: c.id,
    name: c.name,
    ward: c.ward?.name ?? null,
    party: c.party?.name ?? null
  }))

  return (
    <main className='p-6 mb-8'>
      <h1 className='text-2xl font-bold mb-4'>Councillors</h1>
      <div className='overflow-x-auto'>
        <CouncillorsTable councillors={councillors} />
      </div>
    </main>
  )
}
