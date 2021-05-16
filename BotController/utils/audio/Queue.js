import Song from './Song'

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0
    }

    queueSong(value) {
        const newSong = new Song(value)

        if(this.head && this.isQueueEmpty ) {
            this.head = newSong

            this.tail = newSong
        } else {
            this.tail.next = newSong
            newSong.prev = this.tail
            this.tail = newSong
        }
        this.length++

        return newSong
    }
    playSong() {
        const current = this.head
        this.head = this.head.next
        this.head.prev = null
        current.next = null
        this.length--
        return current.value
    }
    cancelSong() {

    }
    printSongs() {
        let current = this.head
        while(current) {
            console.log(current.value)

            current = current.next
        }
    }
    //auxiliary methods
    isQueueEmpty() {
        return this.length === 0
    }
    getFirstSong() {
        return this.head.value
    }
    getNextSong() {
        return this.head.next
    }
    getQueueLength() {
        return this.length
    }
}

export default Queue