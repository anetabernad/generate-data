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
  performRequestDepartments("/departments", "departmentsQuantity");
  performRequestDisqualifyReaons(
    "/disqualify_reasons",
    "disqualifyReasonsQuantity"
  );
  performRequestJobs("/offers", "jobsQuantity");
  performRequestTalentPools("/offers", "talentpoolsQuantity");
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

//Generate body for tags
function tagsBody() {
  let numberOfObjectsToCreate = document.getElementById("tagsQuantity").value;

  let objects = new Array(numberOfObjectsToCreate);
  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  let data = JSON.stringify({
    tags: objects,
  });

  return data;
}

//Generate body for source tags
function sourceTagsBody() {
  let numberOfObjectsToCreate = document.getElementById("sourceTagsQuantity")
    .value;

  let objects = new Array(numberOfObjectsToCreate);
  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  let data = JSON.stringify({
    sources: objects,
  });

  return data;
}

//Generate body for job tags
function offerTagsBody() {
  let numberOfObjectsToCreate = document.getElementById("jobsTagsQuantity")
    .value;

  let objects = new Array(numberOfObjectsToCreate);
  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  let data = JSON.stringify({
    offer_tags: objects,
  });

  return data;
}

/////////////

//Perform request for talent pool

function performRequestTalentPools(endpoint, quantitySelector) {
  let numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    let body = JSON.stringify({
      offer: {
        title: faker.fake("{{name.jobTitle}}"),
        kind: "talent_pool",
      },
    });

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

//Perform request for Job
function performRequestJobs(endpoint, quantitySelector) {
  let numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    let body = JSON.stringify({
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

//Perform request for disqualify reason
function performRequestDisqualifyReaons(endpoint, quantitySelector) {
  let numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    let body = JSON.stringify({
      disqualifyReason: {
        name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}"),
      },
    });

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

//Perform request for department
function performRequestDepartments(endpoint, quantitySelector) {
  let numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    let body = JSON.stringify({
      department: {
        name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}"),
      },
    });

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


function performRequestCandidates(endpoint, quantitySelector) {
  let numberOfObjectsToCreate = document.getElementById(quantitySelector).value;

  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    let body = JSON.stringify({
      candidate: {
        name: faker.fake("{{name.findName}}"),
        coverLetter: faker.fake("{{lorem.paragraph}}"),
        email: faker.fake("{{internet.email}}"),
        phone: faker.fake("{{phone.phoneNumber}}"),
        photoUrl: faker.fake("{{image.avatar}}"),
        referrer: "data generator"
      },
    });

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
//

function candidatesBody() {
  let numberOfObjectsToCreate = document.getElementById("candidatesQuantity").value;

  let objects = new Array(numberOfObjectsToCreate);
  for (let i = 0; i < numberOfObjectsToCreate; i++) {
    objects[i] = {
      candidate:{
        name: faker.fake("{{name.findName}}"),
        coverLetter: faker.fake("{{lorem.paragraph}}"),
        email: faker.fake("{{internet.email}}"),
        phone: faker.fake("{{phone.phoneNumber}}"),
        photoUrl: faker.fake("{{image.avatar}}"),
        referrer: "data generator"
      }
    }
  };

  return objects

}

function performRequest2(endpoint, data) {


  for (var i =0; i < data.length; i++){
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
