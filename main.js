//Get company id
function getCompanyId() {
  let companyId = (document.getElementById("companyId").value = companyId);
}
//Get token
function getApiToken() {
  let apiToken = (document.getElementById("apiToken").value = apiToken);
}

function setEnviromentUrl() {
  if ($('a[data-title="prod"]').hasClass("active")) {
    enviromentUrl = "https://api.recruitee.com/c/";
  } else {
    enviromentUrl = "https://api.s.recruitee.com/c/";
  }
  return enviromentUrl;
}

$("#radioBtn a").on("click", function () {
  var sel = $(this).data("title");
  var tog = $(this).data("toggle");
  $("#" + tog).prop("value", sel);

  $('a[data-toggle="' + tog + '"]')
    .not('[data-title="' + sel + '"]')
    .removeClass("active")
    .addClass("notActive");
  $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]')
    .removeClass("notActive")
    .addClass("active");
});
