'use client'
import Image from 'next/image'
import { Home } from 'lucide-react'
import Link from 'next/link'
import Modal from './Basket'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import logo from '../../../public/logo.png'
import basketPic from '../../../public/basket.svg'

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined
}

export default function Header({ searchParams }: SearchParamProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const basket = searchParams?.basket

  return (
    <div className='flex justify-between items-center'>
      <Link href='/' className='pl-4'>
        <Home color='black' size={32} />
      </Link>

      <Image className="w-60" src={logo} priority={true} alt='logo' />

      <Link
        href='/?basket=true'
        onClick={openModal}
        className='flex items-center pr-3'
      >
        <Image className="size-8" src={basketPic} priority={true} alt='basket' />
        <span className='text-2xl pt-7'>2</span>
        {/* TODO: Выводит из бд колличество товаров в корзине */}
      </Link>

      <AnimatePresence>
        {basket && isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.5 }}
            className='fixed inset-0 modal'
          >
            <Modal closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
