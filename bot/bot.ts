import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import TgBot, {
  CallbackQuery,
  InlineKeyboardMarkup,
} from "node-telegram-bot-api";

import { push_profile } from "./app/components/profile";

import {
  connectToDatabase,
  add_user,
  sendStaic,
  test,
} from "./app/components/db";

const bot = new TgBot(process.env.TOKEN!, { polling: true });
connectToDatabase();
console.log("App create by Anton Kamaev");

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  const add = await add_user(msg);
  console.log(
    add === true
      ? `User ${msg.chat.id} added`
      : `User ${msg.chat.id} already added`,
  );
  if (add === false) {
    bot.deleteMessage(chatId, messageId - 1);
    bot.deleteMessage(chatId, messageId - 2);
  }

  const photo = await sendStaic("logo");

  if (photo) {
    return bot.sendPhoto(msg.chat.id, photo.photo, {
      caption: `<b>✌🏻 Yo ${msg.chat.first_name}! </b>${photo.caption}`,
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
  } else {
    bot.sendMessage(chatId, "Ошибка");
  }
});

bot.on("callback_query", async (callbackQuery: CallbackQuery) => {
  const chatId: number = callbackQuery.message?.chat.id || 0;
  const username: string = callbackQuery.message?.chat.first_name || "Default";
  const messageId: number = callbackQuery.message?.message_id || 0;

  if (!chatId || !username || !messageId) {
    return bot.sendMessage(chatId, "Error");
  }

  switch (callbackQuery.data) {
    case "main_menu":
      const photo: any = await sendStaic("logo");
      bot.editMessageCaption(`<b>✌🏻 Yo ${username}}! </b>${photo.caption}`, {
        chat_id: chatId,
        message_id: messageId,
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
          ],
        } as InlineKeyboardMarkup,
      });
      break;

    case "profile":
      await push_profile(bot, username, chatId, messageId);
      break;

    case "test":
      const output: any = await test();
      console.log(output);
      bot.sendPhoto(chatId, output.photo, {
        caption: `${output.link}\n\n${output.name}\n\n${output.article}\n\n${output.size}\n\n${output.price}`,
      });
      break;
  }
});
