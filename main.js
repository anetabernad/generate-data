

// Set company id
function getCompanyId() {
  var companyId = document.getElementById('companyId').value = companyId
}
// Set token
function getApiToken() {
  var apiToken = document.getElementById('apiToken').value = apiToken
}

//EVENT LISTENER

var generate_btn = document.querySelector('#generate_btn');
generate_btn.addEventListener('click',addTags);
generate_btn.addEventListener('click',addSourceTags);
generate_btn.addEventListener('click',addJobsTags);





//CREATE TAGS
function tagsQty() {
  var tagsQuantity = document.getElementById('tagsQuantity').value = tagsQuantity
}

function addTags() {

  const length = tagsQuantity.value;

  let tags = new Array(length);
      for(let i=0; i<length ;i++){
      tags[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}")
  }

  let endpoint = '/tags'


  var data = JSON.stringify({
      "tags":tags
  });

        new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();

            oReq.addEventListener("load", function () {
            resolve(this.responseText)
                });
            oReq.addEventListener("error", function (error) {
                reject(error)
                })
            oReq.open('POST', 'https://api.s.recruitee.com/c/'+companyId.value+endpoint);
            oReq.setRequestHeader('authorization', 'Bearer '+apiToken.value);
            oReq.setRequestHeader('Content-Type', 'application/json');
            oReq.send(data);

            setTimeout(function () {
            resolve()
            }, 1000)
        })
}

//CREATE SOURCE TAGS
function sourceTagsQty() {
  var sourceTagsQuantity = document.getElementById('sourceTagsQuantity').value = sourceTagsQuantity
}

function addSourceTags() {

  const length = sourceTagsQuantity.value;

  let sourceTags = new Array(length);
      for(let i=0; i<length ;i++){
        sourceTags[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}")
  }
  let endpoint = '/sources'

  var data = JSON.stringify({
      "sources":sourceTags
  });

        new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();

            oReq.addEventListener("load", function () {
            resolve(this.responseText)
                });
            oReq.addEventListener("error", function (error) {
                reject(error)
                })
            oReq.open('POST', 'https://api.s.recruitee.com/c/'+companyId.value+endpoint);
            oReq.setRequestHeader('authorization', 'Bearer '+apiToken.value);
            oReq.setRequestHeader('Content-Type', 'application/json');
            oReq.send(data);

            setTimeout(function () {
            resolve()
            }, 1000)
        })
}


// CREATE JOBS TAGS
function jobsTagsQty() {
  var jobsTagsQuantity = document.getElementById('jobsTagsQuantity').value = jobsTagsQuantity
}

function addJobsTags() {

  const length = jobsTagsQuantity.value;

  let jobsTags = new Array(length);
      for(let i=0; i<length ;i++){
        jobsTags[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}")
  }
  let endpoint = '/offer_tags'

  var data = JSON.stringify({
      "offer_tags":jobsTags
  });

        new Promise(function (resolve, reject) {
        var oReq = new XMLHttpRequest();

            oReq.addEventListener("load", function () {
            resolve(this.responseText)
                });
            oReq.addEventListener("error", function (error) {
                reject(error)
                })
            oReq.open('POST', 'https://api.s.recruitee.com/c/'+companyId.value+endpoint);
            oReq.setRequestHeader('authorization', 'Bearer '+apiToken.value);
            oReq.setRequestHeader('Content-Type', 'application/json');
            oReq.send(data);

            setTimeout(function () {
            resolve()
            }, 1000)
        })
}


