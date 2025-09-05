import { prisma } from '@/lib/prisma'
import CouncillorsTable, { CouncillorRow } from '@/components/CouncillorTable'
import React from 'react'

// Server Component
export default async function CouncillorsPage () {
  const councillors = await prisma.$queryRaw<CouncillorRow[]>`
    SELECT c.id, c.name, p.name AS party, a.name AS ward
    FROM "Councillor" c
    LEFT JOIN "Party" p ON c."partyId" = p.id
    LEFT JOIN "Area" a ON c."wardId" = a.id
    ORDER BY c.name ASC
  `

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Councillors</h1>
      <div className='overflow-x-auto'>
        <CouncillorsTable councillors={councillors} />
      </div>
    </main>
  )
}
