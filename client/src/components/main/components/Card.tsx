'use client'
import { X } from 'lucide-react'
import Link from 'next/link'

type ModalProps = {
  closeModal: () => void
}

export default function Card({ closeModal }: ModalProps) {
  return (
    <div className='flex relative flex-col'>
      <Link href='/'>
        <X
          onClick={closeModal}
          className='absolute top-0 right-0 mt-5 mr-5'
          size={36}
        />
      </Link>

      <div className='mt-20 text-3xl text-center'>Тут будет карточка товара</div>
    </div>
  )
}

