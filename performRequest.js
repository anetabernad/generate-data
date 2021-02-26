//Fire requests
let generate_btn = document.querySelector("#generate_btn");
generate_btn.addEventListener("click", fireRequests);

// function fireRequests(event) {
//   event.preventDefault();
//   performRequest("/tags", tagsBody("tagsQuantity"), setEnviromentUrl());
//   performRequest(
//     "/sources",
//     sourceTagsBody("sourceTagsQuantity"),
//     setEnviromentUrl()
//   );
//   performRequest(
//     "/offer_tags",
//     offerTagsBody("jobsTagsQuantity"),
//     setEnviromentUrl()
//   );
//   performRequest2("/offers", offersBody("jobsQuantity"), setEnviromentUrl());

//   performRequest2(
//     "/offers",
//     talentPoolsBody("talentpoolsQuantity"),
//     setEnviromentUrl()
//   );

//   performRequest2(
//     "/disqualify_reasons",
//     disqualifyReasonsBody("disqualifyReasonsQuantity"),
//     setEnviromentUrl()
//   );

//   performRequest2(
//     "/departments",
//     departmentsBody("departmentsQuantity"),
//     setEnviromentUrl()
//   );

//   performRequest2(
//     "/candidates",
//     candidatesBody("candidatesQuantity"),
//     setEnviromentUrl()
//   );
// }

//Perform requests in queue (candidates, offers, tp, disqualify reasons, departments)
// function performRequest2(endpoint, data, enviromentUrl) {
//   for (i = 0; i < data.length; i++) {
//     let body = JSON.stringify(data[i]);

//     const requestPromise = new PendingPromise((resolve, reject) => {
//       let oReq = new XMLHttpRequest();
//       // oReq.onreadystatechange = () => {
//       //   if (oReq.status === 401 || 403) {
//       //     console.log(oReq.responseText);
//       //     handleUnauthorized();
//       //   }
//       // };
//       oReq.addEventListener("loadend", function () {
//         resolve(this.responseText);
//       });
//       oReq.addEventListener("error", function (error) {
//         reject(error);
//       });
//       oReq.open("POST", enviromentUrl + companyId.value + endpoint);
//       oReq.setRequestHeader("authorization", "Bearer " + apiToken.value);
//       oReq.setRequestHeader("Content-Type", "application/json");
//       oReq.setRequestHeader("x-json-accent", "pascal");
//       oReq.send(body);
//     });

//     Queue.enqueue(requestPromise);
//   }
// }

// //Perform request for tags, sources, offer tags
// function performRequest(endpoint, body, enviromentUrl) {
//   const requestPromise = new PendingPromise((resolve, reject) => {
//     let oReq = new XMLHttpRequest();
//     oReq.addEventListener("load", function () {
//       resolve(this.responseText);
//     });
//     oReq.addEventListener("error", function (error) {
//       reject(error);
//     });
//     oReq.onreadystatechange = () => {
//       if (oReq.status === 401 || 403) {
//         console.log(oReq.responseText);
//         handleUnauthorized();
//       }
//     };
//     oReq.open("POST", enviromentUrl + companyId.value + endpoint);
//     oReq.setRequestHeader("authorization", "Bearer " + apiToken.value);
//     oReq.setRequestHeader("Content-Type", "application/json");
//     oReq.setRequestHeader("x-json-accent", "pascal");
//     oReq.send(body);
//   });
//   Queue.enqueue(requestPromise);
// }

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

/* TESTY */

//Perform request for tags, sources, offer tags
function performRequest(endpoint, body, enviromentUrl, checkbox) {

  if (document.querySelector(checkbox).checked)
  {
  const requestPromise = new PendingPromise((resolve, reject) => {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
      resolve(this.responseText);
    });
    oReq.addEventListener("error", function (error) {
      reject(error);
    });
    oReq.onreadystatechange = () => {
      if (oReq.status === 401 || 403) {
        console.log(oReq.responseText);
        handleUnauthorized();
      }
    };
    oReq.open("POST", enviromentUrl + companyId.value + endpoint);
    oReq.setRequestHeader("authorization", "Bearer " + apiToken.value);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.setRequestHeader("x-json-accent", "pascal");
    oReq.send(body);
  });
  Queue.enqueue(requestPromise);
}
else {
  console.log("request was not send")
}
}

function performRequest2(endpoint, data, enviromentUrl, checkbox) {
  if (document.querySelector(checkbox).checked)
    { for (i = 0; i < data.length; i++) {
      let body = JSON.stringify(data[i]);

      const requestPromise = new PendingPromise((resolve, reject) => {
        let oReq = new XMLHttpRequest();
        oReq.onreadystatechange = () => {
          if (oReq.status === 401 || 403) {
            console.log(oReq.responseText);
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
  }
  else {
    console.log("request was not send")
  }
}

function fireRequests(event) {
  event.preventDefault();
  performRequest("/tags", tagsBody("tagsQuantity"), setEnviromentUrl(), ".checkbox[name=tagsCheckbox]");
  performRequest(
    "/sources",
    sourceTagsBody("sourceTagsQuantity"),
    setEnviromentUrl(), ".checkbox[name=sourceTagsCheckbox]"
  );
  performRequest(
    "/offer_tags",
    offerTagsBody("jobsTagsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=jobsTagsCheckbox]"
  );
  performRequest2("/offers", offersBody("jobsQuantity"), setEnviromentUrl(), ".checkbox[name=jobsCheckbox]");

  performRequest2(
    "/offers",
    talentPoolsBody("talentpoolsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=talentPoolsCheckbox]"
  );

  performRequest2(
    "/disqualify_reasons",
    disqualifyReasonsBody("disqualifyReasonsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=disqualifyReasonsCheckbox]"
  );

  performRequest2(
    "/departments",
    departmentsBody("departmentsQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=departmentsCheckbox]"
  );

  performRequest2(
    "/candidates",
    candidatesBody("candidatesQuantity"),
    setEnviromentUrl(),
    ".checkbox[name=candidatesCheckbox]"
  );
}
