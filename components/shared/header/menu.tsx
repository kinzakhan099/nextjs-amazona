import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

export default function Menu() {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <Link
          className='header-button flex items-center'
          href='/signin'
          aria-label='Sign In'
        >
          Hello, Sign in
        </Link>

        <Link className='header-button' href='/cart'>
          <div className='flex items-end'>
            <ShoppingCartIcon className='hh-8 w-8' />
            Cart
          </div>
        </Link>
      </nav>
    </div>
  )
}
