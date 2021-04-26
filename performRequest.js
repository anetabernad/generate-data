//Fire requests
let generate_btn = document.querySelector("#generate_btn");
generate_btn.addEventListener("click", fireRequests);

function fireRequests(event) {
  event.preventDefault();
  performRequest(
    "/tags",
    tagsBody("tagsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=tagsCheckbox]",
    numberOfObjectsToCreate("tagsQuantity")
  );
  performRequest(
    "/sources",
    sourceTagsBody("sourceTagsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=sourceTagsCheckbox]",
    numberOfObjectsToCreate("sourceTagsQuantity")
  );
  performRequest(
    "/offer_tags",
    offerTagsBody("jobsTagsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=jobsTagsCheckbox]",
    numberOfObjectsToCreate("jobsTagsQuantity")
  );
  performRequest2(
    "/disqualify_reasons",
    disqualifyReasonsBody("disqualifyReasonsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=disqualifyReasonsCheckbox]",
    numberOfObjectsToCreate("disqualifyReasonsQuantity")
  );

  performRequest2(
    "/departments",
    departmentsBody("departmentsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=departmentsCheckbox]",
    numberOfObjectsToCreate("departmentsQuantity")
  );

  performRequest2(
    "/candidates",
    candidatesBody("candidatesQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=candidatesCheckbox]",
    numberOfObjectsToCreate("candidatesQuantity")
  );
  performRequest2(
    "/offers",
    offersBody("jobsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=jobsCheckbox]",
    numberOfObjectsToCreate("jobsQuantity")
  );

  performRequest2(
    "/offers",
    talentPoolsBody("talentpoolsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=talentPoolsCheckbox]",
    numberOfObjectsToCreate("talentpoolsQuantity")
  );
}

//Perform request for tags, sources, offer tags
function performRequest(endpoint, body, enviromentUrl, checkbox, inputValue) {
  if (document.querySelector(checkbox).checked && inputValue !== "0") {
    const requestPromise = new PendingPromise((resolve, reject) => {
      let oReq = new XMLHttpRequest();
      oReq.onreadystatechange = function() {
        if (oReq.status === 401 || oReq.status === 403) {
          handleUnauthorized();
        }
      };
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
    });
    Queue.enqueue(requestPromise);
  } else {
    console.log("request was not send" + endpoint);
  }
}

function performRequest2(endpoint, data, enviromentUrl, checkbox, inputValue) {
  if (document.querySelector(checkbox).checked && inputValue !== "0") {
    for (i = 0; i < data.length; i++) {
      let body = JSON.stringify(data[i]);

      const requestPromise = new PendingPromise((resolve, reject) => {
        let oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
          if (oReq.status === 401 || oReq.status === 403) {
            handleUnauthorized();
          }
        };
        oReq.addEventListener("loadend", function () {
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
  } else {
    console.log("request was not send" + endpoint);
  }
}



//Handle status
function handleUnauthorized() {
  if (
    !alert(
      "Data can't be generated. Check your company id, token and enviroment and try again."
    )
  ) {
    window.location.reload();
  }
}
