export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function HomePage () {
  const motions = await prisma.motion.findMany({
    orderBy: { meetingDate: 'desc' },
    take: 10
  })

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        Christchurch City Council Voting Records
      </h1>
      <ul className='space-y-2'>
        {motions.map(m => (
          <li key={m.id}>
            <Link href={`/motions/${m.id}`} className='underline'>
              {m.title}
            </Link>{' '}
            <span className='text-sm text-gray-500'>
              {new Date(m.meetingDate).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
