class Room {
  constructor() {
    this.currentRoomId, (this.rooms = []);
  }

  all(bot) {
    const rooms = await bot.getTopPublicRooms();
    return rooms;
  }

  getCurrentRoomId(user) {
    return user.currentRoomId;
  }

  findPublic(botAcc, user) {
    this.rooms = all(botAcc);
    this.currentRoomId = this.getCurrentRoomId(user);
    const results = this.rooms.filter(
      room => room.creatorId === this.currentRoomId
    );
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

  createPublic(bot, roomData) {
    if (roomData === null) {
      const DefaultRoomProps = {
        name: 'Welcome | Powered by Gardener ',
        description: 'https://dogegarden.net/',
      };
      const room = await bot.mutation.createRoom(DefaultRoomProps);
      return room;
    }
    if (!bot.name || bot.length === 0) {
      throw new Error('Room name is empty.');
    }
    if (!bot.description || bot.length === 0) {
      throw new Error('Room description is empty.');
    }
    const room = await bot.mutation.createRoom(roomData);
    return room;
  }

  update(roomData) {
    const room = await bot.mutation.editRoom(roomData);
    return room;
  }

  advancedUpdate(roomData) {
    await bot.mutation.updateRoom(roomData);
    return room;
  }

  ban(user) {
    const userId = user.id;
    const banResponse = await bot.mutation.roomBan(userId);
    return banResponse;
  }

  banWithIP(user) {
    const userId = user.id;
    const banResponse = await bot.mutation.roomBan(userId, true);
    return banResponse;
  }

  repeat(repeat) {
    repeat.map(day => {
      const index = this.dayToNumberConverter(day);
      const nextDay = this.dateOfNextDay(index);
      return nextDay;
    });
  }

  dateOfNextDay(index) {
    const today = new Date();
    today.setDate(now.getDate() + ((index + (7 - now.getDay())) % 7));
    return now;
  }

  dayToNumberConverter(dayName) {
    switch (dayName) {
      case 'Sunday':
        return 0;
      case 'Monday':
        return 1;
      case 'Tuesday':
        return 2;
      case 'Wednesday':
        return 3;
      case 'Thursday':
        return 4;
      case 'Friday':
        return 5;
      case 'Saturday':
        return 6;
    }
  }

  schedulePublic(roomData, date, repeat) {
    if (roomData === null && repeat === null) {
      return;
    }
    if (roomData === null) {
      const DefaultRoomProps = {
        name: 'Welcome | Powered by Gardener ',
        description: 'https://dogegarden.net/',
      };
      const room = await bot.mutation.createScheduledRoom(DefaultRoomProps);
      return room;
    }
    if (repeat === null) {
      const room = await bot.mutation.createScheduledRoom(roomData);
      return room;
    }
    const room = await bot.mutation.createScheduledRoom();
    return room;
  }
}
