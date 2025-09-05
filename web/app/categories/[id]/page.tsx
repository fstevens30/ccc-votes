import { prisma } from '@/lib/prisma'

export default async function CategoryPage ({
  params
}: {
  params: { id: string }
}) {
  const { id } = params

  // Fetch the category
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    select: { name: true }
  })

  if (!category) {
    return <p>Category not found</p>
  }

  // Fetch motions for this category
  const motions = await prisma.motion.findMany({
    where: { categoryId: Number(id) },
    orderBy: { meetingDate: 'desc' },
    select: { id: true, title: true, meetingDate: true }
  })

  return (
    <main>
      <h2>Category: {category.name}</h2>
      <ul>
        {motions.map(m => (
          <li key={m.id}>
            <a href={`/motions/${m.id}`}>
              {m.meetingDate.toISOString().split('T')[0]} – {m.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
