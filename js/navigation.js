
// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  //EXERCISE 3 CODE, EXERCISE 7 CODE
  function showCarDetails() {
      
    console.log('showCarDetails...')
    hideErrorAlerts();

    var emptyFields = validateFields("dvPersonalDetails");

    if (emptyFields > 0) {
      $("#dvPersonalDetailsAlert").show();
    }
    else {
      // Hide personal details
      $("#dvPersonalDetails").hide();
      $("#dvQuoteDetails").hide();
      // Proceed to car details step of process
      $("#dvCarDetails").show();
      setActiveNavigation("carLink");
    }
  }

  //EXERCISE 6 CODE
  function showPersonalDetails() {
      // Hide personal details
      $("#dvCarDetails").hide();
      $("#dvQuoteDetails").hide();
      hideErrorAlerts();

      // Proceed to car details step of process
      $("#dvPersonalDetails").show();
      setActiveNavigation("personalLink");
  }

  //EXERCISE 3 CODE, EXERCISE 5 CODE
  function validateFields(section) {
    console.log('validateSection(' + section + ')');
    var errors = 0;
    $('#' + section + ' input[type=text]').each(function(){
      var fieldValue = $(this).val();
      if (fieldValue === ""){
        errors++;
      }
    });
     $('#' + section + ' input[type=number]').each(function(){
      var fieldValue = $(this).val();
      if (fieldValue === ""){
        errors++;
      }
    });
     if ($("#" + section + " input:radio").length && $("#" + section + " input:radio").is(':checked') != true)
      errors++;
    $('#' + section + ' input[type=email]').each(function(){
      var fieldValue = $(this).val();
      if (fieldValue === ""){
        errors++;
      }
    });
    $('#' + section + ' option:selected').each(function(){
      var fieldValue = $(this).val();
      if (fieldValue === "Select"){
        errors++;
      }
    });
    console.log('errors: ' + errors);  
    return errors;
  }

  //EXERCISE 5 CODE
  function showQuoteDetails() {
      hideErrorAlerts();

    var emptyFields = validateFields("dvCarDetails");

    if (emptyFields === 0)
    {
      $("#dvCarDetails").hide();
      $("#dvPersonalDetails").hide();

       $("#dvQuoteDetails").show();
       setActiveNavigation("quoteLink");
    }
    else
    {
      $("#dvCarDetailsAlert").show();
    }
  }

  //EXERCISE 9 CODE
  function getQuote() {

    console.log('getQuote...')
    $("#dvCarDetailsAlert").hide();

    var emptyFields = validateFields("dvCarDetails");

    if (emptyFields === 0)
    {
      var gender = $("#dvPersonalDetails input:radio[name=rdoGender]:checked").val();
      var age = $("#txtAge").val();
      var yearsNoClaims = $("#ddlNCB option:selected").val();
      var costOfCar = $("#txtModelEstValue").val();
      var carStorage = $("#ddlModelStorage option:selected").val();

      var json = {gender:gender, age:age, noClaimsBonus:yearsNoClaims, costOfCar:costOfCar, carStorage:carStorage};
      console.log(json);

      $.ajax({
          type: "GET",
          url: "http://lit-wrkexp-01.lit.lmig.com:8080/api/calculateRates",
          data: json
        }).done(function(msg) {
          $("#txtQuote").text(msg.result.toFixed(2));
          showQuoteDetails();
      });
    }
    else
    {
      $("#dvCarDetailsAlert").show();
    }
  }

//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }
