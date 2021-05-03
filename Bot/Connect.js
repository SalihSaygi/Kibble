const Connect = (theRoom) => {
        try {
            console.info(`=> starting in room "${theRoom.name}" (${theRoom.numPeopleInside} people)`);
            await wrapper.query.joinRoomAndGetInfo(theRoom.id);
            console.info("Successful")
        }
        catch (err) {
            console.error(err)
        }
}