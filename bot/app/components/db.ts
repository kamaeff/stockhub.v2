import { createConnection, Connection } from "mysql2/promise";
import moment from "moment";

import { userInfo, User, Photo } from "./types/db_types";

async function connectToDatabase(): Promise<Connection> {
  const connection = await createConnection({
    host: process.env.HOST,
    user: "gen_user",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  console.log("Connected to MySQL database");
  return connection;
}

async function add_user(msg: { chat: { id: number; username?: string } }) {
  const newUser: User = {
    chatId: msg.chat.id,
    username: msg.chat.username || `${msg.chat.id}`,
    data_reg: moment().format("YYYY-MM-DD HH:mm:ss"),
  };

  const con = await connectToDatabase();
  try {
    const [user]: any = await con.execute(
      "SELECT * FROM Users WHERE chat_id =?",
      [msg.chat.id],
    );

    if (!user.length) {
      await con.execute(
        "INSERT INTO Users (chat_id, username, data_reg, bonus_count, orders_conut) VALUES (?, ?, ?, ?, ?)",
        [newUser.chatId, newUser.username, newUser.data_reg, 0, 0],
      );
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function sendStaic(photo: string): Promise<Photo | null> {
  try {
    const con = await connectToDatabase();
    const [photos]: any = await con.execute(
      "SELECT photo, caption FROM photo_static WHERE photo_name = ?",
      [photo],
    );

    if (!photos || photos.length === 0) {
      throw new Error("Photo not found in database");
    }

    const output: Photo = {
      photo: photos[0].photo,
      caption: photos[0].caption,
    };

    return output;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getProfile(chatId: number): Promise<userInfo | null> {
  try {
    const connection = await connectToDatabase();

    const [rows]: any = await connection.execute(
      "SELECT * FROM users_bot WHERE chat_id = ?",
      [chatId],
    );

    if (!rows || rows.length === 0) {
      throw new Error("No user found with the specified chatId.");
    }

    const user: userInfo = {
      username: rows[0].username,
      reg: rows[0].reg,
      locale: rows[0].locale,
      bonus_count: rows[0].bonus_count,
      orders_count: rows[0].orders_count,
      gender_option: rows[0].gender_option,
      email: rows[0].email,
      fio: rows[0].FIO,
    };

    return user;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export { connectToDatabase, add_user, sendStaic, getProfile };
