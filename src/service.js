class Service {
    constructor(inSeconds) {
        this.interval = inSeconds;
        this.loopMethod = this.loopMethod.bind(this);
    }

    run() {
        const timer = setInterval(this.loopMethod, this.interval * 1000);
    }

    loopMethod() {
        console.log("override this in derived class")
    }
}

export default Service;