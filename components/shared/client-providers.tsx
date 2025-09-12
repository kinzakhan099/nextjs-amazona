'use client'
import React from 'react'
import useCartSidebar from '@/hooks/use-cart-sidebar'
import CartSidebar from './cart-sidebar'
import { Toaster } from 'sonner'
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const isCartSidebarOpen = useCartSidebar()
  //
  return (
    <>
      {/* If cart sidebar is open, show it alongside the children */}
      {isCartSidebarOpen ? (
        <div className='flex min-h-screen'>
          <div className='flex-1 overflow-hidden'>{children}</div>
          <CartSidebar />
        </div>
      ) : (
        <div>{children}</div>
      )}
      <Toaster />
    </>
  )
}
