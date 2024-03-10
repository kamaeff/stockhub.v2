import * as dotenv from 'dotenv'
dotenv.config({path: './.env'})

import TgBot, {
  CallbackQuery,
  InlineKeyboardMarkup,
  Message,
} from 'node-telegram-bot-api'

import {push_profile} from './app/components/profile'

import {add_user, getPhoto} from './app/components/db'
import {createUserDto} from './app/components/types/db_types'

const bot = new TgBot(process.env.TOKEN!, {polling: true})
interface UserStorage {
  [key: number]: {status: string; caption: string}
}
let userStorage: UserStorage = {}

console.log('App create by Anton Kamaev')

bot.onText(/\/start/, async msg => {
  const {
    chat: {id, first_name},
    message_id,
  } = msg

  const data: createUserDto = {
    chat_id: `${id}`,
    username: `${first_name}`,
  }

  const user = await add_user(data)
  const photo = await getPhoto('logo')

  if (photo === false || user === false) {
    return bot.sendMessage(
      id,
      'error\n\n<i>Используй <b>/start</b> для перезапуска бота</i>',
      {
        parse_mode: 'HTML',
      },
    )
  }

  userStorage[id] = {
    caption: photo.caption,
    status: 'none',
  }

  // FIX: Сделать логику удаления сообщений

  // if (message_id && message_id - 2) {
  //   await bot.deleteMessage(id, message_id - 1)
  // }

  return bot.sendPhoto(id, Buffer.from(photo.photo.data), {
    caption: `<b>✌🏻 Yo ${first_name}! </b>${photo.caption}`,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '⚡️ Начать пользоваться',
            web_app: {url: 'https://stockhub12.netlify.app'},
          },
        ],
        [{text: '✌🏻 Мой профиль', callback_data: 'profile'}],
      ],
    } as InlineKeyboardMarkup,
  })
})

bot.on('callback_query', async (callbackQuery: CallbackQuery) => {
  const chatId: number = callbackQuery.message?.chat.id || 0
  const username: string = callbackQuery.message?.chat.first_name || 'Default'
  const messageId: number = callbackQuery.message?.message_id || 0

  if (!chatId || !username || !messageId || !userStorage[chatId]) {
    await bot.deleteMessage(chatId, messageId)
    return bot.sendMessage(
      chatId,
      '☠️Кажется я перезапускался\n<i>💭Используй <b>/start</b> для перезапуска бота</i>',
      {
        parse_mode: 'HTML',
      },
    )
  }

  switch (callbackQuery.data) {
    case 'main_menu':
      await bot.editMessageCaption(
        `<b>✌🏻 Yo ${username}! </b>${userStorage[chatId].caption}`,
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '⚡️ Начать пользоваться',
                  web_app: {url: 'https://stockhub12.netlify.app'},
                },
              ],
              [{text: '✌🏻 Мой профиль', callback_data: 'profile'}],
            ],
          } as InlineKeyboardMarkup,
        },
      )
      break

    case 'profile':
      const res = await push_profile(bot, username, chatId, messageId)
      if (res === false) {
        await bot.sendMessage(
          chatId,
          '☠️Кажется я перезапускался\n<i>💭 Используй <b>/start</b> для перезапуска бота</i>',
          {
            parse_mode: 'HTML',
          },
        )
      }
      break

    case 'locale':
      await bot.editMessageCaption(
        `<i>💭 <b>${username}</b>, введи город в который будет отправляться поссылка</i>`,
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML',
        },
      )
      userStorage[chatId] = {
        status: 'awaitLocale',
        caption: userStorage[chatId].caption,
      }
      break

    default:
      await bot.deleteMessage(chatId, messageId)
      await bot.sendMessage(
        chatId,
        '☠️Кажется я перезапускался\n<i>💭Используй <b>/start</b> для перезапуска бота</i>',
        {
          parse_mode: 'HTML',
        },
      )
      break
  }
})

bot.on('text', async msg => {
  const {
    chat: {id, first_name},
    text,
    message_id,
  }: Message = msg

  if (userStorage[id]) {
    const currentState = userStorage[id].status

    switch (currentState) {
      case 'awaitEmail':
        await bot.deleteMessage(id, message_id)
        // TODO: Сделать валидацию по email с помощью @IsEmail()
        break

      case 'awaitLocale':
        const userText = text
        await bot.deleteMessage(id, message_id - 1)

        break

      case 'awaitFIO':
        break

      case 'none':
        // bot.deleteMessage(id, message_id);
        break
    }
  }
})
