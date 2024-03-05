'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { Search, SlidersHorizontal } from 'lucide-react'

import Slide from '../../../public/Group 18.png'
import product from '../../../public/product.png'
import basketPic from '../../../public/basket.svg'

import Filter from './components/Filter'
import Card from './components/Card'

import './Main.scss'

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
  const card = searchParams?.card

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

        <div className='flex justify-center items-center m-auto bg-white mt-3 carousel'>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showThumbs={false}
          >
            <div>
              <Image className='' src={Slide} priority={true} alt='logo' />
            </div>
            <div>
              <Image className='' src={Slide} priority={true} alt='logo' />
            </div>
            <div>
              <Image className='' src={Slide} priority={true} alt='logo' />
            </div>
          </Carousel>
        </div>

        <Link className='m-auto' href='/?card=true' onClick={openModal}>
          <div className="flex items-center justify-around m-auto product bg-white">
            <Image className='ms-3' src={product} width={197} height={170} alt='product' />
            <div className="grid justify-center text-center">
              <p className='max-w-40 text-left text-lg leading-5 italic'>Jordan 4 Retro SE Craft Photon Dust</p>
              <div className="flex gap-2 mt-3">
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
              </div>

              <div className="flex justify-between mt-14">
                <p className='font-medium italic text-xl'>23 457₽</p>

                <Image className="size-7" src={basketPic} priority={true} alt='basket' />
              </div>
            </div>
          </div>
        </Link>

        <Link className='m-auto' href='/?card=true' onClick={openModal}>
          <div className="flex items-center justify-around m-auto product bg-white">
            <Image className='ms-3' src={product} width={197} height={170} alt='product' />
            <div className="grid justify-center text-center">
              <p className='max-w-40 text-left text-lg leading-5 italic'>Jordan 4 Retro SE Craft Photon Dust</p>
              <div className="flex gap-2 mt-3">
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
                <p className='bg-gray-100 px-3 py-2 text-sm text-center italic rounded-lg'>8</p>
              </div>

              <div className="flex justify-between mt-14">
                <p className='font-medium italic text-xl'>23 457₽</p>

                <Image className="size-7" src={basketPic} priority={true} alt='basket' />
              </div>
            </div>
          </div>
        </Link>


        {/* TODO: Сделать единый файл для анимаци вывода окон */}
        <AnimatePresence>
          {card && isModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 1000 }}
              transition={{ duration: 0.5 }}
              className='fixed inset-0 modal'
            >
              <Card closeModal={closeModal} />
            </motion.div>
          )}
        </AnimatePresence>

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
    </>
  )
}
