class PendingPromise {

  constructor(args) {
    this.args = args;
  }

  execute() {
    return new Promise(this.args);
  }
}

class Queue {
  static queue = [];
  static pendingPromise = false;

  static enqueue(promise) {
    return new Promise((resolve, reject) => {
      const s = {
        promise: promise,
        resolve: resolve,
        reject: reject,
      };
      console.log(s);
        this.queue.push(s);
        this.dequeue();
    });
  }

  static dequeue() {
    if (this.workingOnPromise) {
      return false;
    }
    const item = this.queue.shift();
    
    if (!item) {
      return false;
    }
    try {
      this.workingOnPromise = true;
      console.log("starts");
      item.promise.execute()
        .then((value) => {
          console.log("resolved");
          this.workingOnPromise = false;
          item.resolve(value);
          console.log("resolved");
          console.log(value);
          this.dequeue();
        })
        .catch(err => {
          console.log("error");
          this.workingOnPromise = false;
          item.reject(err);
          this.dequeue();
        })
    } catch (err) {
      console.log(err)
      this.workingOnPromise = false;
      item.reject(err);
      this.dequeue();
    }
    return true;
  }
}
