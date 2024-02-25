import { createUserDto } from "./types/db_types";

async function add_user(data: createUserDto) {
  try {
    const response = await fetch("http://localhost:3001/user/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(`User ${data.chat_id} added`);
      return true;
    } else {
      console.error(`Failed to add user ${data.chat_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
}

export { add_user };
