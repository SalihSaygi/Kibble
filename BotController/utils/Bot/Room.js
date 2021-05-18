class Room {
  constructor() {
    this.currentRoomId, (this.rooms = []);
  }

  all(bot) {
    const rooms = await bot.getTopRooms();
    return rooms;
  }

  findPublic(botAcc) {
    this.rooms = all(botAcc);
    const results = this.rooms.filter(room => room.creatorId === currentRoomId);
    if (results.length > 0) {
      const room = results[0];
      return room;
    }
    throw new Error('Could not find the room you are in.');
  }

  findPrivate(botAcc, roomId) {
    this.rooms = all(botAcc);
    const results = this.rooms.filter(room => room.creatorId === roomId);
    if (results.length > 0) {
      const room = results[0];
      return room;
    }
  }
}
