'use client'
import { Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import React, { useState, Component } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import Slide from '../../../public/Group 18.png'

import Filter from './Filter'
import Image from 'next/image'

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined
}

export default function Main({ searchParams }: SearchParamProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const filter = searchParams?.filter

  return (
    <>
      <div className=''>
        <div className='flex gap-2 justify-center items-center -mt-3'>
          <div className='flex gap-1.5 p-3.5 bg-white rounded-lg'>
            <Search size={28} />
            <input
              className='w-72 text-xl border-white outline-none'
              placeholder='Поиск'
            ></input>
          </div>
          <Link
            href='/?filter=true'
            onClick={openModal}
            className='p-3.5 bg-white rounded-lg'
          >
            <SlidersHorizontal size={28} />
          </Link>
        </div>
        <AnimatePresence>
          {filter && isModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 1000 }}
              transition={{ duration: 0.5 }}
              className='fixed inset-0 modal'
            >
              <Filter closeModal={closeModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='my-2 mx-auto lg:w-3/4'></div>
      <div className="w-96 m-auto bg-white carousel">
        <Carousel infiniteLoop={true} autoPlay={true} interval={5000} showThumbs={false}>
          <div>
            <Image className='' src={Slide} alt='logo' />
          </div>
          <div>
            <Image className='' src={Slide} alt='logo' />
          </div>
          <div>
            <Image className='' src={Slide} alt='logo' />
          </div>
        </Carousel>
      </div>
    </>
  )
}
