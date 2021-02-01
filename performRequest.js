
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
  performRequest2("/offers", offersBody("jobsQuantity"), setEnviromentUrl());

  performRequest2(
    "/offers",
    talentPoolsBody("talentpoolsQuantity"),
    setEnviromentUrl()
  );

  performRequest2(
    "/disqualify_reasons",
    disqualifyReasonsBody("disqualifyReasonsQuantity"),
    setEnviromentUrl()
  );

  performRequest2(
    "/departments",
    departmentsBody("departmentsQuantity"),
    setEnviromentUrl()
  );

  performRequest2(
    "/candidates",
    candidatesBody("candidatesQuantity"),
    setEnviromentUrl()
  );
}

//Perform requests in queue (candidates, offers, tp, disqualify reasons, departments)
function performRequest2(endpoint, data, enviromentUrl) {
  for (i = 0; i < data.length; i++) {
    let body = JSON.stringify(data[i]);

    const requestPromise = new PendingPromise((resolve, reject) => {
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

    Queue.enqueue(requestPromise);


  }
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
