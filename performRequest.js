//Fire requests
let generate_btn = document.querySelector("#generate_btn");
generate_btn.addEventListener("click", fireRequests);

function fireRequests(event) {
  event.preventDefault();
  performRequest("/tags", tagsBody(), setEnviromentUrl());
  performRequest("/sources", sourceTagsBody(), setEnviromentUrl());
  performRequest("/offer_tags", offerTagsBody(), setEnviromentUrl());
  performRequest2("/offers", offersBody(), setEnviromentUrl());
  performRequest2("/offers", talentPoolsBody(), setEnviromentUrl());
  performRequest2(
    "/disqualify_reasons",
    disqualifyReasonsBody(),
    setEnviromentUrl()
  );
  performRequest2("/departments", departmentsBody(), setEnviromentUrl());
  performRequest2("/candidates", candidatesBody(), setEnviromentUrl());
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

//Perform request for candidates, offers, tp, disqualify reasons, departments
function performRequest2(endpoint, data, enviromentUrl) {
  for (let i = 0; i < data.length; i++) {
    let body = JSON.stringify(data[i]);

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
}
