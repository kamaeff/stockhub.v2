import { createUserDto } from "./types/db_types";

async function add_user(data: createUserDto) {
  try {
    const response = await fetch(`${process.env.URL}/user/add`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("add user");
      return true;
    } else {
      console.log("user already added");
      return true;
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
}

async function getPhoto(data: string) {
  try {
    const response = await fetch(`${process.env.URL}/photo/get`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке названия фото");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getProfile(chat_id: string) {
  try {
    const response = await fetch(`${process.env.URL}/user/get`, {
      method: "POST",
      body: JSON.stringify({ chat_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("profile not found");

    const res = await response.json();
    return res;
  } catch (error) {
    return false;
  }
}

export { add_user, getPhoto, getProfile };
