import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import TgBot, { Chat, InlineKeyboardMarkup } from "node-telegram-bot-api";

// import { push_profile } from "./app/components/profile";

import {
  // connectToDatabase,
  add_user,
  getPhoto,
  // test,
} from "./app/components/db";

import { createUserDto } from "./app/components/types/db_types";
import { userInfo } from "os";

const bot = new TgBot(process.env.TOKEN!, { polling: true });
console.log("App create by Anton Kamaev");

interface UserStorage {
  [key: number]: { status: string; caption: string };
}

let userStorage: UserStorage = {};

bot.onText(/\/start/, async (msg) => {
  const {
    message_id,
    chat: { id, first_name },
  } = msg;

  const data: createUserDto = {
    chat_id: `${id}`,
    username: `${first_name}`,
    email: "none",
    fio: "none",
    locale: "none",
  };

  await add_user(data);
  const photo = await getPhoto("logo");

  if (photo === false) bot.sendMessage(id, "error");
  userStorage[id] = {
    caption: photo.caption,
    status: "none",
  };

  await bot.deleteMessage(id, message_id - 1);
  await bot.sendPhoto(id, Buffer.from(photo.photo.data), {
    caption: photo.caption,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⚡️ Начать пользоваться",
            web_app: { url: "https://stockhub12.netlify.app" },
          },
          { text: "📝 Поиск по артиклу", callback_data: "articul" },
        ],
        [{ text: "✌🏻 Мой профиль", callback_data: "profile" }],
        [{ text: "✌test", callback_data: "test" }],
      ],
    } as InlineKeyboardMarkup,
  });
});

bot.on("text", async (msg) => {
  const {
    chat: { id, first_name },
    text,
    message_id,
  } = msg;

  if (userStorage[id]) {
    const currentState = userStorage[id].status;

    switch (currentState) {
      case "awaitEmail":
        await bot.deleteMessage(id, message_id);

        break;

      case "none":
        bot.deleteMessage(id, message_id);
        break;
    }
  }
});

// bot.on("callback_query", async (callbackQuery: CallbackQuery) => {
//   const chatId: number = callbackQuery.message?.chat.id || 0;
//   const username: string = callbackQuery.message?.chat.first_name || "Default";
//   const messageId: number = callbackQuery.message?.message_id || 0;
//
//   if (!chatId || !username || !messageId) {
//     return bot.sendMessage(chatId, "Error");
//   }
//
//   switch (callbackQuery.data) {
//     case "main_menu":
//       const photo: any = await sendStaic("logo");
//       bot.editMessageCaption(`<b>✌🏻 Yo ${username}}! </b>${photo.caption}`, {
//         chat_id: chatId,
//         message_id: messageId,
//         parse_mode: "HTML",
//         reply_markup: {
//           inline_keyboard: [
//             [
//               {
//                 text: "⚡️ Начать пользоваться",
//                 web_app: { url: "https://stockhub12.netlify.app" },
//               },
//               { text: "📝 Поиск по артиклу", callback_data: "articul" },
//             ],
//             [{ text: "✌🏻 Мой профиль", callback_data: "profile" }],
//           ],
//         } as InlineKeyboardMarkup,
//       });
//       break;
//
//     case "profile":
//       await push_profile(bot, username, chatId, messageId);
//       break;
//
//     case "test":
//       const output: any = await test();
//       console.log(output);
//       bot.sendPhoto(chatId, output.photo, {
//         caption: `${output.link}\n\n${output.name}\n\n${output.article}\n\n${output.size}\n\n${output.price}`,
//       });
//       break;
//   }
// });
