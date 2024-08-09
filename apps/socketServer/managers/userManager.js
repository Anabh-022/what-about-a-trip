import { WebSocket } from "ws";

export class UserManager {
  room;
  constructor() {
    this.room = new Map();
  }

  addUser(userId, socket) {
    if (this.room.get(userId))
      return
    this.room.set(userId, socket);

    console.log("User Added");
    socket.on("close", () => {
      this.room.delete(userId);
    })

  }

  removeUser(userId) {
    this.room.delete(userId);
    console.log("User deleteed!!");
  }

  getUser(userId) {
    const user = this.room.get(userId);
    return user;
  }

  brodcast(userId, message, isBinary) {
    console.log(userId)
    if (!this.room.get(userId)) {
      console.log("user not found")
      console.table(this.room);
      return
    }

    this.room.forEach((value, key, map) => {
      if (key === userId) {
        return;
      }

      value.send(message, { binary: isBinary });
    })
    console.log(message);
  }
}
