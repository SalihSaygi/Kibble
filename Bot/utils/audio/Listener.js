
class Listener {
    constructor(whiteList, status, blackList) {
        this.whiteList = whiteList;
        this.status = status;
        this.blackList = blackList;
    }
    
      get whiteList() {
        return this.whiteList
    }

    get blackList() {
        return this.blackList
    }

    get status() {
        return this.status
    }
}

export default Listener