import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
})

async function main () {
  console.log('Seed script started!')

  // Create some parties
  const labour = await prisma.party.create({ data: { name: 'Labour' } })
  const tpc = await prisma.party.create({
    data: { name: "The People's Choice" }
  })
  const icitz = await prisma.party.create({
    data: { name: 'Independent Citizens' }
  })
  const tpclab = await prisma.party.create({
    data: { name: "Labour / The People's Choice" }
  })
  const independent = await prisma.party.create({
    data: { name: 'Independent' }
  })

  // Create some wards (areas)
  const cityWide = await prisma.area.create({
    data: { name: 'City Wide', type: 'City-wide' }
  })

  // Community Boards
  const banksCB = await prisma.area.create({
    data: {
      name: 'Te Pātaka o Rākaihautū Banks Peninsula',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })
  const waitaiCB = await prisma.area.create({
    data: {
      name: 'Waitai Coastal-Burwood-Linwood',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waimaeroCB = await prisma.area.create({
    data: {
      name: 'Waimāero Fendalton-Waimairi-Harewood',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waipunaCB = await prisma.area.create({
    data: {
      name: 'Waipuna Halswell-Hornby-Riccarton',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waipapaCB = await prisma.area.create({
    data: {
      name: 'Waipapa Papanui-Innes-Central',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  const waihoroCB = await prisma.area.create({
    data: {
      name: 'Waihoro Spreydon-Cashmere-Heathcote',
      type: 'Community Board',
      parentId: cityWide.id
    }
  })

  // Wards
  const banksPeninsula = await prisma.area.create({
    data: {
      name: 'Banks Peninsula',
      type: 'Ward',
      parentId: banksCB.id
    }
  })
  const coastal = await prisma.area.create({
    data: { name: 'Coastal', type: 'Ward', parentId: waitaiCB.id }
  })
  const burwood = await prisma.area.create({
    data: { name: 'Burwood', type: 'Ward', parentId: waitaiCB.id }
  })
  const linwood = await prisma.area.create({
    data: { name: 'Linwood', type: 'Ward', parentId: waitaiCB.id }
  })
  const fendalton = await prisma.area.create({
    data: { name: 'Fendalton', type: 'Ward', parentId: waimaeroCB.id }
  })
  const waimairi = await prisma.area.create({
    data: { name: 'Waimairi', type: 'Ward', parentId: waimaeroCB.id }
  })
  const harewood = await prisma.area.create({
    data: { name: 'Harewood', type: 'Ward', parentId: waimaeroCB.id }
  })
  const hornby = await prisma.area.create({
    data: { name: 'Hornby', type: 'Ward', parentId: waipunaCB.id }
  })
  const halswell = await prisma.area.create({
    data: { name: 'Halswell', type: 'Ward', parentId: waipapaCB.id }
  })
  const riccarton = await prisma.area.create({
    data: { name: 'Riccarton', type: 'Ward', parentId: waipunaCB.id }
  })
  const papanui = await prisma.area.create({
    data: { name: 'Papanui', type: 'Ward', parentId: waipapaCB.id }
  })
  const innes = await prisma.area.create({
    data: { name: 'Innes', type: 'Ward', parentId: waipapaCB.id }
  })
  const central = await prisma.area.create({
    data: { name: 'Central', type: 'Ward', parentId: waipapaCB.id }
  })
  const spreydon = await prisma.area.create({
    data: { name: 'Spreydon', type: 'Ward', parentId: waihoroCB.id }
  })
  const cashmere = await prisma.area.create({
    data: { name: 'Cashmere', type: 'Ward', parentId: waihoroCB.id }
  })
  const heathcote = await prisma.area.create({
    data: { name: 'Heathcote', type: 'Ward', parentId: waihoroCB.id }
  })

  // Create councillors manually
  await prisma.councillor.create({
    data: {
      name: 'Phil Mauger',
      partyId: independent.id,
      wardId: cityWide.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Tyrone Fields',
      partyId: tpc.id,
      wardId: banksPeninsula.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Celeste Donovan',
      partyId: independent.id,
      wardId: coastal.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Kelly Barber',
      partyId: independent.id,
      wardId: burwood.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Yani Johanson',
      partyId: tpclab.id,
      wardId: linwood.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'James Gough',
      partyId: icitz.id,
      wardId: fendalton.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Sam MacDonald',
      partyId: icitz.id,
      wardId: waimairi.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Aaron Keown',
      partyId: independent.id,
      wardId: harewood.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Mark Peters',
      partyId: independent.id,
      wardId: hornby.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Andrei Moore',
      partyId: independent.id,
      wardId: halswell.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Tyla Harrison-Hunt',
      partyId: tpc.id,
      wardId: riccarton.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Victoria Henstock',
      partyId: independent.id,
      wardId: papanui.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Pauline Cotter',
      partyId: tpc.id,
      wardId: innes.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Jake McLellan',
      partyId: labour.id,
      wardId: central.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Melanie Coker',
      partyId: tpclab.id,
      wardId: spreydon.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Tim Scandrett',
      partyId: independent.id,
      wardId: cashmere.id
    }
  })

  await prisma.councillor.create({
    data: {
      name: 'Sara Templeton',
      partyId: independent.id,
      wardId: heathcote.id
    }
  })

  console.log('Seed data created!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
