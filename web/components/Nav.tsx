import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export async function Nav () {
  return (
    <nav className='p-4 border-b border-gray-200'>
      <div className='flex flex-col justify-center sm:flex-row sm:items-center sm:justify-around gap-2'>
        {/* Title */}
        <h1 className='text-2xl font-bold'>
          How they <i>really</i> voted
        </h1>

        {/* Navigation buttons */}
        <NavigationMenu>
          <NavigationMenuList className='flex gap-2'>
            <NavigationMenuItem>
              <Link
                href='/'
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/councillors'
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                Councillors
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/about'
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
