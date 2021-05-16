import Queue from './Queue'
import BotSettings from './BotSettings'

class QueueController {
    constructor(song, user) {
        this.song = song;
        this.user = user;
        this.this.BotSettings = new BotSettings()
    }
    eventQueue() {
        switch(this.listener.status) {
            case "public":
                Queue.queueSong(song)
            case "private":
                if(this.user) {
                    Queue.queueSong(song)
                }
            case "customWhite": 
                const whiteList = this.listener.whiteList
                if(whiteList.includes(user)){
                    Queue.queueSong(song)
                }
            case "customBlack":
                const blackList = this.listener.blackList
                if(blackList.includes(user)) {
                    Queue.queueSong(song)
                }
        }
        
    }
    eventPlay() {
        switch(this.listener.status) {
            case "public":
                Queue.playSong(song)
            case "private":
                if(this.user) {
                    if(this.listener.status)
                    Queue.playSong(song)
                }
            case "customWhite": 
                const whiteList = this.listener.whiteList
                if(whiteList.includes(user)){
                    Queue.playSong(song)
                }
            case "customBlack":
                const blackList = this.listener.blackList
                if(blackList.includes(user)) {
                    Queue.playSong(song)
                }
        }
    }
    
}

export default QueueController