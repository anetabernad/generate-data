//Get company id
function getCompanyId() {
  let companyId = (document.getElementById("companyId").value = companyId);
}
//Get token
function getApiToken() {
  let apiToken = (document.getElementById("apiToken").value = apiToken);
}

//Event listener
let generate_btn = document.querySelector("#generate_btn");
generate_btn.addEventListener("click", fireRequests);

function fireRequests(event) {
  event.preventDefault();
  performRequest("/tags", tagsBody());
  performRequest("/sources", sourceTagsBody());
  performRequest("/offer_tags", offerTagsBody());
  performRequest2("/offers", offersBody());
  performRequest2("/offers", talentPoolsBody());
  performRequest2("/disqualify_reasons", disqualifyReasonsBody());
  performRequest2("/departments", departmentsBody());
  performRequest2("/candidates", candidatesBody());
}

//Perform request for tags, sources, offer tags
function performRequest(endpoint, body) {
  new Promise(function (resolve, reject) {
    let oReq = new XMLHttpRequest();

    oReq.addEventListener("load", function () {
      resolve(this.responseText);
    });
    oReq.addEventListener("error", function (error) {
      reject(error);
    });
    oReq.open(
      "POST",
      "https://api.s.recruitee.com/c/" + companyId.value + endpoint
    );
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
function performRequest2(endpoint, data) {
  for (var i = 0; i < data.length; i++) {
    var body = JSON.stringify(data[i]);

    new Promise(function (resolve, reject) {
      let oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function () {
        resolve(this.responseText);
      });
      oReq.addEventListener("error", function (error) {
        reject(error);
      });
      oReq.open(
        "POST",
        "https://api.s.recruitee.com/c/" + companyId.value + endpoint
      );
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
