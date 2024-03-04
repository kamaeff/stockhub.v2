'use client'
import { X } from 'lucide-react'
import Link from 'next/link'
import React, { Component } from 'react'; 

type ModalProps = {
  closeModal: () => void
}

export default function Modal({ closeModal }: ModalProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <Link href='/'>
        <X onClick={closeModal} className='absolute top-0 right-0 mt-5 mr-5' size={36} />
      </Link>

      <div className='text-center text-3xl text-gray-500'>
        Корзина пуста
      </div>

    </div>
  )
}
