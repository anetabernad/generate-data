function numberOfObjectsToCreate(selector) {
  let numberOfObjectsToCreate = document.getElementById(selector).value;

  return numberOfObjectsToCreate;
}

//Generate body for tags
function tagsBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  let data = JSON.stringify({
    tags: objects,
  });

  return data;
}

//Generate body for source tags
function sourceTagsBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  let data = JSON.stringify({
    sources: objects,
  });

  return data;
}

//Generate body for job tags
function offerTagsBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects[i] = faker.fake("{{name.jobDescriptor}} {{name.jobArea}}");
  }

  let data = JSON.stringify({
    offer_tags: objects,
  });

  return data;
}

//Generate body for departments
function departmentsBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects[i] = {
      department: {
        name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}"),
      },
    };
  }
  return objects;
}

//Generate body for disqualify reasons
function disqualifyReasonsBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects[i] = {
      disqualifyReason: {
        name: faker.fake("{{name.jobDescriptor}} {{name.jobArea}}"),
      },
    };
  }
  return objects;
}

//Generate body for offers
function offersBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects.push({
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
  }
  return objects;
}

//Generate body for talent pools
function talentPoolsBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects[i] = {
      offer: {
        title: faker.fake("{{name.jobTitle}}"),
        kind: "talent_pool",
      },
    };
  }
  return objects;
}

//Generate body for candidates
function candidatesBody(field) {
  const objects = [];
  for (let i = 0; i < numberOfObjectsToCreate(field); i++) {
    objects[i] = {
      candidate: {
        name: faker.fake("{{name.findName}}"),
        coverLetter: faker.fake("{{lorem.paragraph}}"),
        email: faker.fake("{{internet.email}}"),
        phone: faker.fake("{{phone.phoneNumber}}"),
        photoUrl: faker.fake("{{image.avatar}}"),
        referrer: "data generator",
      },
    };
  }
  return objects;
}
