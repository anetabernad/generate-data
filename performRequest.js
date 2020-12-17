
//Fire requests
let generate_btn = document.querySelector("#generate_btn");
generate_btn.addEventListener("click", fireRequests);

function fireRequests(event) {
  event.preventDefault();
  performRequest("/tags", tagsBody("tagsQuantity"), setEnviromentUrl());
  performRequest(
    "/sources",
    sourceTagsBody("sourceTagsQuantity"),
    setEnviromentUrl()
  );
  performRequest(
    "/offer_tags",
    offerTagsBody("jobsTagsQuantity"),
    setEnviromentUrl()
  );
  const offersRequests = performRequest2(
    "/offers",
    offersBody("jobsQuantity"),
    setEnviromentUrl()
  );
  const offersQueue = new PromiseQueue(offersRequests, 1); //tasks = an array of aysnc functions, 1 = number of tasks to run in parallel
  offersQueue.run();

  const talentPoolsRequests = performRequest2(
    "/offers",
    talentPoolsBody("talentpoolsQuantity"),
    setEnviromentUrl()
  );
  const talentPoolsQueue = new PromiseQueue(talentPoolsRequests, 1);
  talentPoolsQueue.run();

  const disqualifyReasonsRequests = performRequest2(
    "/disqualify_reasons",
    disqualifyReasonsBody("disqualifyReasonsQuantity"),
    setEnviromentUrl()
  );

  const disqualifyReasonsQueue = new PromiseQueue(disqualifyReasonsRequests, 1);
  disqualifyReasonsQueue.run();

  const departmentsRequestes = performRequest2(
    "/departments",
    departmentsBody("departmentsQuantity"),
    setEnviromentUrl()
  );

  const departmentsQueue = new PromiseQueue(departmentsRequestes, 1);
  departmentsQueue.run();

  const candidatesRequestes = performRequest2(
    "/candidates",
    candidatesBody("candidatesQuantity"),
    setEnviromentUrl()
  );

  const candidatesQueue = new PromiseQueue(candidatesRequestes, 1);
  candidatesQueue.run();
}

// Queue for offer
function PromiseQueue(offersQueue = [], concurrentCount = 1) {
  this.total = offersQueue.length;
  this.todo = offersQueue;
  this.running = [];
  this.complete = [];
  this.count = concurrentCount;
}

// Queue for talent pools
function PromiseQueue(talentPoolsQueue = [], concurrentCount = 1) {
  this.total = talentPoolsQueue.length;
  this.todo = talentPoolsQueue;
  this.running = [];
  this.complete = [];
  this.count = concurrentCount;
}

// Queue for disqualify reasons
function PromiseQueue(disqualifyReasonsQueue = [], concurrentCount = 1) {
  this.total = disqualifyReasonsQueue.length;
  this.todo = disqualifyReasonsQueue;
  this.running = [];
  this.complete = [];
  this.count = concurrentCount;
}

// Queue for departments
function PromiseQueue(departmentsQueue = [], concurrentCount = 1) {
  this.total = departmentsQueue.length;
  this.todo = departmentsQueue;
  this.running = [];
  this.complete = [];
  this.count = concurrentCount;
}

// Queue for candidates
function PromiseQueue(candidatesQueue = [], concurrentCount = 1) {
  this.total = candidatesQueue.length;
  this.todo = candidatesQueue;
  this.running = [];
  this.complete = [];
  this.count = concurrentCount;
}

PromiseQueue.prototype.runNext = function () {
  return this.running.length < this.count && this.todo.length;
};

PromiseQueue.prototype.run = function () {
  while (this.runNext()) {
    const promise = this.todo.shift();
    console.log("Run next");
    console.log(this.todo.length);
    promise.then(() => {
      console.log("request done");
      this.complete.push(this.running.shift());
      this.run();
    });
    this.running.push(promise);
  }
};

//Perform requests in queue (candidates, offers, tp, disqualify reasons, departments)
function performRequest2(endpoint, data, enviromentUrl) {
  const promises = [];
  for (i = 0; i < data.length; i++) {
    let body = JSON.stringify(data[i]);

    const requestPromise = new Promise((resolve, reject) => {
      let oReq = new XMLHttpRequest();
      oReq.addEventListener("loadend", function () {
        console.log("Request finished", i);
        console.log(this.responseText);
        resolve(this.responseText);
      });
      oReq.addEventListener("error", function (error) {
        reject(error);
      });
      oReq.open("POST", enviromentUrl + companyId.value + endpoint);
      oReq.setRequestHeader("authorization", "Bearer " + apiToken.value);
      oReq.setRequestHeader("Content-Type", "application/json");
      oReq.setRequestHeader("x-json-accent", "pascal");
      oReq.send(body);
    });

    promises.push(requestPromise);
  }

  return promises;
}

//Perform request for tags, sources, offer tags
function performRequest(endpoint, body, enviromentUrl) {
  new Promise(function (resolve, reject) {
    let oReq = new XMLHttpRequest();

    oReq.addEventListener("load", function () {
      resolve(this.responseText);
    });
    oReq.addEventListener("error", function (error) {
      reject(error);
    });
    oReq.open("POST", enviromentUrl + companyId.value + endpoint);
    oReq.setRequestHeader("authorization", "Bearer " + apiToken.value);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.setRequestHeader("x-json-accent", "pascal");

    oReq.send(body);

    setTimeout(function () {
      resolve();
    }, 1000);
  });
}
