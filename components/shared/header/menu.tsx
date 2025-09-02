import Link from 'next/link'
import CartButton from './cart-button'

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

        <CartButton />
      </nav>
    </div>
  )
}
