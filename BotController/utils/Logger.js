import fs from 'fs'

export const Logger = (msg, type, userId, botId, roomUsers = []) => {
    let logs = []
    const room = {
        
    }
    const logStarter = room.parseJSON()
    logs.push(logStarter)
    let log
    switch (type) {
        //Chat
        case "text":
            log = `Chat/Text: ${userId} typed ${msg} at ${new Date()}.`
        case "command":
            log = `Chat/Command: ${userId} commanded bot ${botId} by typing ${msg} at ${new Date()}.`
        case "mention": 
            log = `Chat/Mention Text: ${userId} typed ${msg} mentioning ${msg.mention} at ${new Date()}.`
        //Room
        case "userJoin":
            log = `Room/Join: ${userId} joined the room at ${new Date()}.`
        case "userLeave":
            log = `Room/Leave: ${userId} left the room at ${new Date()}.`
        case "raiseHand": 
            log = `Room/Hand: ${userId} raised hand to speak at ${new Date()}.`
        case "userSpeaker":
            const moderators = roomUsers.filter(user => user.roomPermissions.isMod == true)
            log = `Room/Speaker: ${userId} has been allowed to be speaker by one of the following moderators: ${moderators} at ${new Date()}.`
        case "userListenerForce":
            const moderators = roomUsers.filter(user => user.roomPermissions.isMod == true)
            log = `Room/ListenerForce: ${userId} has been forced pushed to the listeners by one of the following moderators: ${moderators} at ${new Date()}.`
        case "userListener":
            log = `Room/Listener: ${userId} has voluntarily became a listener at ${new Date()}.`
        //Moderation
            const moderators = roomUsers.filter(user => user.roomPermissions.isMod == true)
            const creator = room.creatorId
        case "userMod":
            log = `Moderation/Enmod: ${userId} has been promoted to mod by one of the following moderators: ${moderators} at ${new Date()}.`
        case "userDeMod":
            log = `Moderation/Demod: ${userId} has been demoted to mod by the admin ${admin} at ${new Date()}.`
        case "userAdmin":
            log = `Moderation/EnAdmin: ${userId} has been promoted to admin by th admin ${creator} at ${new Date()}.`
        case "userDeAdmin":
            log = `Moderation/DeAdmin: ${userId} has been demoted from admin at ${new Date()}.`
        //Mutation
        case "roomBan":
            log = `Mutation/roomBan: ${userId} has been banned from the room by one of the following moderators: ${moderators} at ${new Date()}.`
        case "ban":
            log = `Mutation/ban: ${userId} has been banned from DogeHouse by a staff at ${new Date()}`
        case "textDeleted":
            log = `Mutation/textDeleted: A message sent by ${msg.user} that says ${msg} has been deleted by one of the following moderators: ${moderators} at ${new Date()}.`
        //User
        case "deafen":
            log = `User/deafen: ${userId} is deafened at ${new Date()}.`
        case "undeafen":
            log = `User/undeafen: ${userId} is undeafened at ${new Date()}.`
        case "mute":
            log = `User/mute: ${userId} is muted at ${new Date()}.`
        case "mute":
            log = `User/unmute: ${userId} is muted at ${new Date()}.`
    }
    logs.push(log)
    logs.join("\r\n")//add line between logs
    return logs
}

export const createLogFile = (logText) => {
    fs.writeFile(
        `dogehouse-${theRoom.id}-${theRoom.name}-${new Date()}.txt`, 
        logText,
        function(err) {
            if(err) throw err;
            console.log('Log file is created.')
        }
        )
}