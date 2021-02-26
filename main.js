//Get company id
function getCompanyId() {
  let companyId = (document.getElementById("companyId").value = companyId);
}
//Get token
function getApiToken() {
  let apiToken = (document.getElementById("apiToken").value = apiToken);
}

//Set enviroment
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

//Disable Generate button

$('#generate').on('click', function() {
  $(this).find('button[type="submit"]').attr('disabled', true);
  $(this).find('.alert_success').attr('hidden', true);
  $(this).find('button[type="submit"]').html("Generating data...");
});

//Validate input

var invalidChars = ["-", "e", "+", "E", "."];

$("input[type='number']").on("keydown", function(e){
    if(invalidChars.includes(e.key)){
         e.preventDefault();
    }
})

//Validate min and max value

$(document).on('keyup', 'input[type="number"]', function() {
  var _this = $(this);
  var min = parseInt(_this.attr('min')) || 0; // if min attribute is not defined, 1 is default
  var max = parseInt(_this.attr('max')) || 100; // if max attribute is not defined, 100 is default
  var val = parseInt(_this.val()) || (min - 0); // if input char is not a number the value will be (min - 1) so first condition will be true
  if (val < min)
    _this.val(min);
  if (val > max)
    _this.val(max);
});
