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
  performRequest("/tags", tagsBody());
  performRequest("/sources", sourceTagsBody());
  performRequest("/offer_tags", offerTagsBody());
  performRequestDepartments("/departments", "departmentsQuantity");
  performRequestDisqualifyReaons(
    "/disqualify_reasons",
    "disqualifyReasonsQuantity"
  );
  performRequestJobs("/offers", "jobsQuantity");
  performRequestTalentPools("/offers", "talentpoolsQuantity");
  performRequestCandidates("/candidates", "candidatesQuantity");
}

//Perform request for tags, sources, offer tags
function performRequest(endpoint, body) {
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
    oReq.setRequestHeader("x-json-accent", "pascal");
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

/////////////

//Perform request for talent pool

function performRequestTalentPools(endpoint, quantitySelector) {
  var numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (var i = 0; i < numberOfObjectsToCreate; i++) {
    var body = JSON.stringify({
      offer: {
        title: faker.fake("{{name.jobTitle}}"),
        kind: "talent_pool",
      },
    });

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
      oReq.setRequestHeader("x-json-accent", "pascal");
      oReq.send(body);

      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}

//Perform request for Job
function performRequestJobs(endpoint, quantitySelector) {
  var numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (var i = 0; i < numberOfObjectsToCreate; i++) {
    var body = JSON.stringify({
      offer: {
        title: faker.fake("{{name.jobTitle}}"),
        city: faker.fake("{{address.city}}"),
        countryCode: "PL",
        stateCode: "DS",
        postalCode: faker.fake("{{address.zipCode}}"),
        description: faker.fake("{{lorem.lines}}"),
        requirements: faker.fake("{{lorem.paragraph}}"),
        employmentType: "temporary",
        category: "administrative",
        education: "high_school",
        experience: "student_college",
      },
    });

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
      oReq.setRequestHeader("x-json-accent", "pascal");
      oReq.send(body);

      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}

//Perform request for disqualify reason
function performRequestDisqualifyReaons(endpoint, quantitySelector) {
  var numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (var i = 0; i < numberOfObjectsToCreate; i++) {
    var body = JSON.stringify({
      disqualifyReason: {
        name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}"),
      },
    });

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
      oReq.setRequestHeader("x-json-accent", "pascal");
      oReq.send(body);

      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}

//Perform request for department
function performRequestDepartments(endpoint, quantitySelector) {
  var numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (var i = 0; i < numberOfObjectsToCreate; i++) {
    var body = JSON.stringify({
      department: {
        name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}"),
      },
    });

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
      oReq.setRequestHeader("x-json-accent", "pascal");
      oReq.send(body);

      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}

function performRequestCandidates(endpoint, quantitySelector) {
  var numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (var i = 0; i < numberOfObjectsToCreate; i++) {
    new Promise(function (resolve, reject) {
      var data = new FormData();
      data.append("candidate[name]", faker.fake("{{name.findName}}"));
      data.append("candidate[coverLetter]", faker.fake("{{lorem.paragraph}}"));
      data.append("candidate[emails][]", faker.fake("{{internet.email}}"));
      data.append("candidate[phones][]", faker.fake("{{phone.phoneNumber}}"));

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
      oReq.setRequestHeader("x-json-accent", "pascal");
      oReq.send(data);

      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}

//////

// //Generate body for department
// function departmentsBody() {

//   var data = JSON.stringify({
//     department: {
//       name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}")
//     }
//   });

//   return data;
// }

// //Generate body for disqualify reasons
// function disqualifyReasonsBody() {

//   var data = JSON.stringify({
//     disqualifyReason: {
//       name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}")
//     }
//   });

//   return data;
// }

// //Generate body for offer
// function offersBody() {

//   var data = JSON.stringify({
//     offer: {
//       title: faker.fake("{{name.jobTitle}}"),
//       city: faker.fake("{{address.city}}"),
//       countryCode: "PL",
//       stateCode: "DS",
//       postalCode: faker.fake("{{address.zipCode}}"),
//       description: faker.fake("{{lorem.lines}}"),
//       requirements: faker.fake("{{lorem.paragraph}}"),
//       employmentType: "temporary",
//       category: "administrative",
//       education: "high_school",
//       experience: "student_college"
//     }
//   });

//   return data;
// }

// //Generate body for talent pool
// function talentPoolsBody() {

//   var data = JSON.stringify({
//     offer: {
//       title: faker.fake("{{name.jobTitle}}"),
//       kind: "talent_pool"
//     }
//   });

//   return data;
// }

// //Perform request for departments, disqualify reason, offer
// function performRequest(endpoint, body, quantitySelector) {

//   var numberOfObjectsToCreate = document.getElementById(quantitySelector)
//   .value;

//   for (var i =0; i < numberOfObjectsToCreate; i++){

//     new Promise(function (resolve, reject) {
//       var oReq = new XMLHttpRequest();

//       oReq.addEventListener("load", function () {
//         resolve(this.responseText);
//       });
//       oReq.addEventListener("error", function (error) {
//         reject(error);
//       });
//       oReq.open(
//         "POST",
//         "https://api.s.recruitee.com/c/" + companyId.value + endpoint
//       );
//       oReq.setRequestHeader("authorization", "Bearer " + apiToken.value);
//       oReq.setRequestHeader("Content-Type", "application/json");
//       oReq.setRequestHeader('x-json-accent', 'pascal');
//       oReq.send(body);

//       setTimeout(function () {
//         resolve();
//       }, 1000);
//     });
//   };
// }
