//Get company id
function getCompanyId() {
  var companyId = (document.getElementById("companyId").value = companyId);
}
//Get token
function getApiToken() {
  var apiToken = (document.getElementById("apiToken").value = apiToken);
}

//Event listener
var generate_btn = document.querySelector("#generate_btn");
generate_btn.addEventListener("click", fireRequests);

function fireRequests(event) {
  event.preventDefault();
  performRequestTags("/tags", tagsBody());
  performRequestTags("/sources", sourceTagsBody());
  performRequestTags("/offer_tags", offerTagsBody());
  performRequest("/departments", departmentsBody(), "departmentsQuantity");
  performRequest("/disqualify_reasons", disqualifyReasonsBody(), "disqualifyReasonsQuantity")
}

//Perform request for tags, sources, offer tags
function performRequestTags(endpoint, body) {
  new Promise(function (resolve, reject) {
    var oReq = new XMLHttpRequest();

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
    oReq.send(body);

    setTimeout(function () {
      resolve();
    }, 1000);
  });
}


//Generate body for tags
function tagsBody() {
  var numberOfObjectsToCreate = document.getElementById("tagsQuantity").value;

  let objects = new Array(numberOfObjectsToCreate);
  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  var data = JSON.stringify({
    tags: objects,
  });

  return data;
}

//Generate body for source tags
function sourceTagsBody() {
  var numberOfObjectsToCreate = document.getElementById("sourceTagsQuantity")
    .value;

  let objects = new Array(numberOfObjectsToCreate);
  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  var data = JSON.stringify({
    sources: objects,
  });

  return data;
}

//Generate body for job tags
function offerTagsBody() {
  var numberOfObjectsToCreate = document.getElementById("jobsTagsQuantity")
    .value;

  let objects = new Array(numberOfObjectsToCreate);
  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  var data = JSON.stringify({
    offer_tags: objects,
  });

  return data;
}

//Generate body for department
function departmentsBody() {

  var data = JSON.stringify({
    department: {
      name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}")
    }
  });

  return data;
}

//Generate body for disqualify reasons
function disqualifyReasonsBody() {

  var data = JSON.stringify({
    disqualifyReason: {
      name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}")
    }
  });

  return data;
}

//Perform request for departments, disqualify reason,
function performRequest(endpoint, body, quantitySelector) {

  var numberOfObjectsToCreate = document.getElementById(quantitySelector)
  .value;

  for (var i =0; i < numberOfObjectsToCreate; i++){


    new Promise(function (resolve, reject) {
      var oReq = new XMLHttpRequest();

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
      oReq.setRequestHeader('x-json-accent', 'pascal');
      oReq.send(body);

      setTimeout(function () {
        resolve();
      }, 1000);
    });
  };
}
