'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'

import {AnimatePresence, motion} from 'framer-motion'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import {
  ArrowBigUpDash,
  Footprints,
  Search,
  Shirt,
  SlidersHorizontal,
} from 'lucide-react'

import slide from '../../../public/Shooe.png'
import product from '../../../public/product.png'

import Card from './components/Card'
import Filter from './components/Filter'

import './Main.scss'

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined
}

export default function Main({searchParams}: SearchParamProps) {
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
        <div className=''>
          <div className='flex gap-2 justify-center items-center -mt-3'>
            <div className='flex gap-1.5 p-3.5 bg-white rounded-lg shadow-lg'>
              <Search size={28} />
              <input
                className='w-72 text-xl border-white outline-none'
                placeholder='Поиск'
              ></input>
            </div>
            <Link
              href='/?filter=true'
              onClick={openModal}
              className='p-3.5 bg-white rounded-lg shadow-lg'
            >
              <SlidersHorizontal size={28} />
            </Link>
          </div>

          {/* TODO: Сделать логику вывода выбранных фильтров */}
        </div>

        <div className='w-96 flex m-auto justify-between my-3'>
          <button className='flex items-center text-center gap-3 px-12 py-2 border-white bg-white rounded-lg'>
            <Shirt size={30} />
            <p>Одежда</p>
          </button>

          <button className='flex items-center text-center gap-3 px-12 py-2 border-white bg-white rounded-lg'>
            <Footprints />
            <p>Обувь</p>
          </button>
        </div>

        <div className='flex justify-center items-center m-auto bg-white mt-3 main__carousel'>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showThumbs={false}
          >
            <div>
              <Image
                className='slider__item'
                src={slide}
                priority={true}
                alt='logo'
              />
            </div>
            <div>
              <Image
                className='slider__item'
                src={slide}
                priority={true}
                alt='logo'
              />
            </div>
            <div>
              <Image
                className='slider__item'
                src={slide}
                priority={true}
                alt='logo'
              />
            </div>
          </Carousel>
        </div>

        <Link className='m-auto' href='/?card=true' onClick={openModal}>
          <div className='flex items-center justify-around m-auto product bg-white'>
            <div className='product__carousel'>
              <Carousel
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                showThumbs={false}
              >
                <div>
                  <Image
                    className=''
                    src={product}
                    priority={true}
                    alt='logo'
                  />
                </div>
                <div>
                  <Image
                    className=''
                    src={product}
                    priority={true}
                    alt='logo'
                  />
                </div>
                <div>
                  <Image
                    className=''
                    src={product}
                    priority={true}
                    alt='logo'
                  />
                </div>
              </Carousel>
            </div>
            <div className='grid justify-center'>
              <p className='max-w-40 text-left text-xl leading-5 italic'>
                Jordan 4 Retro SE Craft Photon Dust
              </p>
              <div className='flex flex-col justify-between mt-3'>
                <p className='font-medium'>Размеры: </p>
                <div className='flex gap-2 mt-1'>
                  <p className='text-sm text-center italic rounded-lg'>8, </p>
                  <p className='text-sm text-center italic rounded-lg'>8.5, </p>
                  <p className='text-sm text-center italic rounded-lg'>9, </p>
                  <p className='text-sm text-center italic rounded-lg'>9.5</p>
                </div>
              </div>

              <div className='flex justify-between items-center mt-1'>
                <p className='font-medium italic text-xl p-2 bg-gray-100 rounded-lg'>
                  23 457₽
                </p>
                <ArrowBigUpDash size={30} />
              </div>
            </div>
          </div>
        </Link>

        <Link className='m-auto' href='/?card=true' onClick={openModal}>
          <div className='flex items-center justify-around m-auto product bg-white'>
            <div className='product__carousel'>
              <Carousel
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                showThumbs={false}
              >
                <div>
                  <Image
                    className=''
                    src={product}
                    priority={true}
                    alt='logo'
                  />
                </div>
                <div>
                  <Image
                    className=''
                    src={product}
                    priority={true}
                    alt='logo'
                  />
                </div>
                <div>
                  <Image
                    className=''
                    src={product}
                    priority={true}
                    alt='logo'
                  />
                </div>
              </Carousel>
            </div>
            <div className='grid justify-center'>
              <p className='max-w-40 text-left text-xl leading-5 italic'>
                Jordan 4 Retro SE Craft Photon Dust
              </p>
              <div className='flex flex-col justify-between mt-3'>
                <p className='font-medium'>Размеры: </p>
                <div className='flex gap-2 mt-1'>
                  <p className='text-sm text-center italic rounded-lg'>8, </p>
                  <p className='text-sm text-center italic rounded-lg'>8.5, </p>
                  <p className='text-sm text-center italic rounded-lg'>9, </p>
                  <p className='text-sm text-center italic rounded-lg'>9.5</p>
                </div>
              </div>

              <div className='flex justify-between items-center mt-1'>
                <p className='font-medium italic text-xl p-2 bg-gray-100 rounded-lg'>
                  23 457₽
                </p>
                <ArrowBigUpDash size={30} />
              </div>
            </div>
          </div>
        </Link>

        {/* TODO: Сделать единый файл для анимаци вывода окон */}
        <AnimatePresence>
          {card && isModalOpen && (
            <motion.div
              initial={{opacity: 0, y: 1000}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 1000}}
              transition={{duration: 0.5}}
              className='fixed inset-0 modal'
            >
              <Card closeModal={closeModal} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {filter && isModalOpen && (
            <motion.div
              initial={{opacity: 0, y: 1000}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 1000}}
              transition={{duration: 0.5}}
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
