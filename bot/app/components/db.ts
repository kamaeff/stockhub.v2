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
    } else {
      console.log("user already added");
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

export { add_user, getPhoto };
