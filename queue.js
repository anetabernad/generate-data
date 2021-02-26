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
      console.log("Done");
      generate_btn.removeAttribute("disabled");
      alert_success.removeAttribute("hidden");
      generate_btn.innerHTML = "Generate";
      return false;
    }
    try {
      this.workingOnPromise = true;
      console.log("starts");
      item.promise
        .execute()
        .then((value) => {
          this.workingOnPromise = false;
          item.resolve(value);
          console.log("resolved");
          console.log("QUEUE LENGTH : " + this.queue.length);
          generate_btn.innerHTML = "Generating data... " + this.queue.length;
          this.dequeue();
        })
        .catch((err) => {
          console.log(this.err);
          this.workingOnPromise = false;
          item.reject(err);
          this.dequeue();
        });
    } catch (err) {
      console.log(err);
      this.workingOnPromise = false;
      item.reject(err);
      this.dequeue();
    }

    return true;
  }
}
