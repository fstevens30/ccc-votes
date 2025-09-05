import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default async function HomePage () {
  const motions = await prisma.motion.findMany({
    orderBy: { meetingDate: 'desc' },
    take: 10
  })

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>
        Christchurch City Council Voting Records
      </h1>
      <div className='grid gap-4'>
        {motions.map(m => (
          <Card key={m.id} className='hover:shadow-lg transition-shadow p-4'>
            <Link
              href={`/motions/${m.id}`}
              className='underline text-lg font-semibold'
            >
              {m.title}
            </Link>
            <p className='text-sm text-gray-500 mt-1'>
              {new Date(m.meetingDate).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    </main>
  )
}
