$(document).ready(function () {

  var currentLoadValue = parseFloat($('#currentLoad').text());
  var currentDemandValue = parseFloat($('#currentDemand').text());

  $('#revisedLoad').val(currentLoadValue.toFixed(2));
  $('#revisedDemand').val(currentDemandValue);
  var tariffType = $('#tariffTyp').val();
  var tariffCategory = $('#tariffCategory').val();
  var tariffCatCode = $('#tariffCatCode').val();


  if (tariffCategory == "DOMESTIC") {
    $("#revisedDemand").attr("readonly", true);
  }
  // Disable save button initially
  $('#saveButton').prop('disabled', true);

  // Update item load on selection change
  $('select[name="load_item"]').change(function () {

    var selectedValue = $(this).val();

    if (selectedValue == 'other') {
      // alert("other");
      $("#loadItemDisplay").attr("readonly", false);
      $("#load_item").attr("readonly", false);

    }
    var parts = selectedValue.split("#");
    var itemLoad = parts[0];
    var loadItemDisplay = parts[1];
    $('input[name="load_item_display"]').val(loadItemDisplay);
    $('input[name="item_load"]').val(itemLoad);

    qnatityUpdate();
  });

  function qnatityUpdate() {
    updateTotalLoad();
  }
  // Update total load when quantity changes
  $('input[name="quantity"]').on('input', function () {
    // Update total load when quantity changes
    updateTotalLoad();
  });

  // Enable/disable save button based on form completion
  $('select[name="load_item"], input[name="item_load"], input[name="quantity"]').on('input change', function () {
    var dropdownValue = $('select[name="load_item"]').val();

    // Separate the value into two parts
    var parts = dropdownValue.split("#");
    var loadItem = parts[0];

    var itemLoad = $('input[name="item_load"]').val();
    var quantity = $('input[name="quantity"]').val();

    if (loadItem !== "" && itemLoad !== "" && quantity !== "") {
      $('#saveButton').prop('disabled', false);
    } else {
      $('#saveButton').prop('disabled', true);
    }
  });

  // Perform the calculation and update the total load
  function updateTotalLoad() {
    var itemLoad = parseFloat($('input[name="item_load"]').val());
    var quantity = parseFloat($('input[name="quantity"]').val());

    if (!isNaN(itemLoad) && !isNaN(quantity)) {
      var totalLoad = parseFloat((itemLoad * quantity) / 1000);
      $('input[name="total_load"]').val(totalLoad);
    } else {
      $('input[name="total_load"]').val("");
    }
  }


  $('#saveButton').on('click', function () {


    var dropdownValue = $('select[name="load_item"]').val();

    // Separate the value into two parts
    var parts = dropdownValue.split("#");
    var load_item_opt = parts[1];
    var load_item = $('#load_item').val();
    var qntity = $('#qntity').val();
    var total_load = $('#total_load').val();
    var c_remarks = $('#c_remarks').val();
    // var count = $('#myTable tr').length;

    if (load_item_opt != "selectOpt" && load_item != "" && qntity != "" && total_load != "") {
      $('#myTable tbody').append('<tr class="child"><td><label class="loadItem">' + load_item_opt + '</label></td><td><label class="LoadItemInWatt">' + load_item + '</label></td><td><label class="LoadItemQuantity">' + qntity + '</label></td><td class="LoadItemTotalWatts">' + total_load + '</td><td class="loadItemRemarks">' + c_remarks + '</td><td><a href="javascript:void(0);" class="remCF1 btn btn-small btn-danger">Remove</a></td></tr>');
    }
    else {
      $.jAlert({
        'title': 'Error',
        'content': 'Please enter all the fields!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("Please enter all the fields!");
    }

    updateTotalLoadInTable();
    $('#loadModal').hide();
    $('.testReportDoc').removeClass('hidden');
    //      // For reset input and dropdown
    // $('#reason_id').prop('selectedIndex',0);
    //       //For reset textarea
    // $("textarea[name='field2']").val('');


    // $.jAlert({
    //   'title': 'Error',
    //   'content': 'Load Item added successfully!',
    //   'theme': 'blue',
    //   'backgroundColor': 'white',
    //   'btns': [
    //   {'text':'OK', 'theme':'blue'}
    //      ]
    //  });

    // alert("Load Item added successfully!");

    var newLoadValue = parseFloat($('#totalLoadValue').val());
    var revisedLoadValue = newLoadValue.toFixed(2);
    var changeLoadValue = Math.abs(revisedLoadValue - currentLoadValue).toFixed(2);
    $('#revisedLoad').val(revisedLoadValue);
    $('#changeLoad').val(changeLoadValue);

  });

  $(document).on('click', '.remCF1', function () {
    $(this).parent().parent().remove();

    // if ($('#totalLoadValue').val()==0) {
    //   // alert("Load revert");
    // $('#revisedLoad').val(currentLoadValue);
    // $('.testReportDoc').addClass('hidden');

    //   // return;
    // }
    // updateTotalLoadInTable();
    updateTotalLoadRedInTable();

  });

  function updateTotalLoadInTable() {
    var ttlLoad = 0;
    // var ttlDemand = 0;

    // Iterate over each row and sum the total loads
    $('#myTable tbody tr').each(function () {
      var rowTotalLoad = parseFloat($(this).find('td:nth-child(4)').text());

      if (!isNaN(rowTotalLoad)) {
        ttlLoad += rowTotalLoad;
      }
    });

    // Update the total load value in the table footer
    $('#totalLoadValue').val(ttlLoad.toFixed(2));


    var revisedLoadValue = ttlLoad.toFixed(2);

    var changeLoadValue = Math.abs(revisedLoadValue - currentLoadValue).toFixed(2);

    var pacLoadValue = (revisedLoadValue - currentLoadValue);
    if ((pacLoadValue > 99)) {
      // $('#PACtitle').css('visibility','visible');
      $('#PACtitle').removeClass('hidden');
    }
    else if ((pacLoadValue < 100)) {
      // $('#PACtitle').css('visibility','hidden');
      $('#PACtitle').addClass('hidden');
    }

    $('#revisedLoad').val(revisedLoadValue);
    $('#changeLoad').val(changeLoadValue);

  }

  function updateTotalLoadRedInTable() {
    var ttlLoad = 0;

    // Iterate over each row and sum the total loads
    $('#myTable tbody tr').each(function () {
      var rowTotalLoad = parseFloat($(this).find('td:nth-child(4)').text());

      if (!isNaN(rowTotalLoad)) {
        ttlLoad += rowTotalLoad;
      }
    });

    // Update the total load value in the table footer
    $('#totalLoadValue').val(ttlLoad.toFixed(2));


    var revisedLoadValue = ttlLoad.toFixed(2);


    var pacLoadValue = (revisedLoadValue - currentLoadValue);
    if ((pacLoadValue > 99)) {
      // $('#PACtitle').css('visibility','visible');
      $('#PACtitle').removeClass('hidden');
    }
    else if ((pacLoadValue < 100)) {
      // $('#PACtitle').css('visibility','hidden');
      $('#PACtitle').addClass('hidden');
    }

    if ($('#totalLoadValue').val() == 0) {
      // alert("Load revert");
      $('#revisedLoad').val(currentLoadValue);
      $('.testReportDoc').addClass('hidden');
      // return;
    } else {
      $('#revisedLoad').val(revisedLoadValue);
    }
    var revLoad = $('#revisedLoad').val();
    var changeLoadValue = Math.abs(revLoad - currentLoadValue).toFixed(2);

    $('#changeLoad').val(changeLoadValue);

  }

  $('#revisedDemand').on('change', function () {

    var revisedDemandValue = parseFloat($(this).val());
    var revisedLoadValue = parseFloat($('#revisedLoad').val());
    var changeLoadValue = Math.abs(currentLoadValue - revisedLoadValue).toFixed(2);
    var changeDemandValue = Math.abs(currentDemandValue - revisedDemandValue);
    var pacLoadValue = (revisedLoadValue - currentLoadValue);
    var pacDemandValue = (revisedDemandValue - currentDemandValue);
    if (revisedDemandValue > parseInt(revisedLoadValue / 0.9)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand Cannot Exceed 111% of Connected Load!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("Revised Demand cannot exceed 90% of Revised Load!");
      // $(this).val(parseInt(revisedLoadValue / 0.9));
      $(this).val(currentDemandValue);
      return;
    }
    if (revisedDemandValue < 0) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand Cannot be less than Zero!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('For demand load greater than 20, Tariff Class must be Two Part!');
      $(this).val(parseInt(currentDemandValue));
      return;
    }
    if (revisedDemandValue > 20 && tariffType == "Single Part") {
      $.jAlert({
        'title': 'Error',
        'content': 'For demand load greater than 20, Tariff Class must be Two Part!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('For demand load greater than 20, Tariff Class must be Two Part!');
      $(this).val(parseInt(currentDemandValue));
      return;
    }
    if (tariffCatCode == "I2" && !(revisedDemandValue < 50)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand cannot be greater than 50 kVA in Small Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if ((tariffCatCode == "I3" && !(revisedDemandValue > 51)) || (tariffCatCode == "I3" && !(revisedDemandValue < 100))) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand should be in range 51-100 kVA in Medium Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (tariffCatCode == "I4" && !(revisedDemandValue > 100)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand cannot be Less than 100 kVA in Large Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (revisedDemandValue < 21 && tariffType == "Two Part") {
      $.jAlert({
        'title': 'Error',
        'content': 'Demand load cannot be less than 20 for Two Part!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $(this).val(parseInt(currentDemandValue));
      return;
    }
    if ((pacDemandValue > 99) || (pacLoadValue > 99)) {
      // $('#PACtitle').css('visibility','visible');
      $('#PACtitle').removeClass('hidden');
    }
    else if ((pacDemandValue < 100) || (pacLoadValue < 100)) {
      // $('#PACtitle').css('visibility','hidden');
      $('#PACtitle').addClass('hidden');
    }

    // if ($(this).val()==0) {
    //   // alert("Load revert");
    //   // $(this).val(parseInt(revisedLoadValue / 0.9));

    //}

    // $('#changeLoad').val(changeLoadValue);
    $('#changeDemand').val(changeDemandValue);
  });

  //VALIDATIONS

  $(".js-btn-first").click(function () {


    var $currentDiv = $(this).closest('.MyFirstDiv');
    var nextDivId = $(this).data('next-div');
    var $nextDiv = $(nextDivId);


    var isValid = true;

    if (isValid == true) {
      $nextDiv.show();
      $('.js-btn-first').hide();
      $('#cstep2').addClass('stepActive');
      $('html, body').animate({
        scrollTop: $nextDiv.offset().top
      }, 1000, function () {
        $nextDiv.find('.js-btn-second').focus();
      });
    } else {
      $.jAlert({
        'title': 'Error',
        'content': 'Please complete the validation in first step before proceeding to the next!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Please complete the validation in first step before proceeding to the next!');
    }
  });


  $(".js-btn-second").on("click", function (event) {

    event.preventDefault(); // Prevent the default form submission


    var $currentDiv = $(this).closest('.MyFirstDiv');
    var nextDivId = $(this).data('next-div');
    var $nextDiv = $(nextDivId);

    var currentLoadValue = parseFloat($('#currentLoad').text());
    var currentDemandValue = parseFloat($('#currentDemand').text());
    var revisedDemandValue = parseFloat($('#revisedDemand').val());
    var revisedLoadValue = parseFloat($('#revisedLoad').val());

    if ((revisedDemandValue == 0) && (revisedLoadValue == 0)) {
      $.jAlert({
        'title': 'Error',
        'content': 'New Load and Demand Cannot be zero!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });

      // alert("New Load and Demand Cannot be zero!");
      return;
    }

    if ((revisedDemandValue - currentDemandValue == 0) && (revisedLoadValue - currentLoadValue == 0)) {

      $.jAlert({
        'title': 'Error',
        'content': 'New Load and Demand Cannot be same as old value!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("New Load and Demand Cannot be same as old value!");
      return;
    }

    var selectedValue = $("#selectCycle").val();
    if ((selectedValue == null) || (selectedValue == "")) {
      $.jAlert({
        'title': 'Error',
        'content': 'Please Select Revised Effective Date for Change in Contract Demand!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("Please Select Revised Effective Date for Change in Contract Demand!");
      return;
    }
    var pacLoadValue = (revisedLoadValue - currentLoadValue);
    var pacDemandValue = (revisedDemandValue - currentDemandValue);
    if (revisedDemandValue > parseInt(revisedLoadValue / 0.9)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand Cannot Exceed 111% of Connected Load!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("Revised Demand cannot exceed 90% of Revised Load!");
      // $(this).val(parseInt(revisedLoadValue / 0.9));
      $('#revisedDemand').val(currentDemandValue);
      $('#PACtitle').addClass('hidden');
      return;
    }
    if (revisedDemandValue > 20 && tariffType == "Single Part") {
      $.jAlert({
        'title': 'Error',
        'content': 'For demand load greater than 20, Tariff Class must be Two Part!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('For demand load greater than 20, Tariff Class must be Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (tariffCatCode == "I2" && !(revisedDemandValue < 50)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand cannot be greater than 50 kVA in Small Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if ((tariffCatCode == "I3" && !(revisedDemandValue > 51)) || (tariffCatCode == "I3" && !(revisedDemandValue < 100))) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand should be in range 51-100 kVA in Medium Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (tariffCatCode == "I4" && !(revisedDemandValue > 100)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand cannot be Less than 100 kVA in Large Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (revisedDemandValue < 21 && tariffType == "Two Part") {
      $.jAlert({
        'title': 'Error',
        'content': 'Demand load cannot be less than 20 for Two Part!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if ((pacDemandValue > 99) || (pacLoadValue > 99)) {
      // $('#PACtitle').css('visibility','visible');
      $('#PACtitle').removeClass('hidden');
    }
    else if ((pacDemandValue < 100) || (pacLoadValue < 100)) {
      // $('#PACtitle').css('visibility','hidden');
      $('#PACtitle').addClass('hidden');
    }

    var pacBox = $("#PACtitle");
    if (pacBox.is(":visible")) {
      // Validate the input box
      if ($('#pacInput').val().trim() === "") {
        $.jAlert({
          'title': 'Error',
          'content': 'Please enter PAC number!',
          'theme': 'blue',
          'backgroundColor': 'white',
          'btns': [
            { 'text': 'OK', 'theme': 'blue' }
          ]
        });
        // alert("Please enter PAC number!");
        return;
      }
    }

    var isValid = true;

    if (isValid == true) {
      $nextDiv.show();
      $('.js-btn-second').hide();
      $('#cstep3').addClass('stepActive');
      $('html, body').animate({
        scrollTop: $nextDiv.offset().top
      }, 1000, function () {
        $nextDiv.find('.submitBtn').focus();
      });
    } else {
      $.jAlert({
        'title': 'Error',
        'content': 'Please complete the validation in second step before proceeding to the next!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Please complete the validation in second step before proceeding to the next!');
    }
    if ($(".hideDivCount:visible").length == 0) {
      $('.multisteps-form__title, .third-step').addClass('hidden');
      $.jAlert({
        'title': 'Successful',
        'content': 'Please Click on Submit button to Submit the Application!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
    }
  });


  var flagSuccessful = false;

  $('#uploadTestReportButton').click(function (e) {

    e.preventDefault(); // Prevent the default button click behavior

    var fileInput = $('#testRepDocInput')[0];
    var file = fileInput.files[0];

    if (file) {
      // var consumerId = $('#consumerIdInput').val();
      // var flag = $('#flagInput').val();

      var formData = new FormData();
      formData.append('document', file);
      // formData.append('consumerId', consumerId);
      // formData.append('flag', flag);
      


      $.ajax({
        url: 'upload.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function(){
          $(".loader-div").show();
         },
        success: function (response) {
          // Handle the response from the server
          console.log('Hex data:', response);

          // Set flagSuccessful to true if the flag is successful
          flagSuccessful = true;
        },complete:function(data){
          $(".loader-div").hide();
         },
        error: function (xhr, status, error) {
          // Handle any errors that occur during the AJAX request
          console.error('Error:', error);
          $(".loader-div").hide();
        }
      });
    }
    else {
      $.jAlert({
        'title': 'Error',
        'content': 'Pls upld file!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("pls upld file!");
    }
  });

  $('#submitFormBtn').click(function (e) {
    e.preventDefault(); // Prevent the default button click behavior
    var currentLoadValue = parseFloat($('#currentLoad').text());
    var currentDemandValue = parseFloat($('#currentDemand').text());
    var revisedDemandValue = parseFloat($('#revisedDemand').val());
    var revisedLoadValue = parseFloat($('#revisedLoad').val());
    var loadItems = ""; // new addition
    var formData = new FormData($("#formLC")[0]); // new addition

    var fileInput = $('#testRepDocInput')[0];
    var file = fileInput.files[0];

    if ((revisedDemandValue == 0) && (revisedLoadValue == 0)) {
      $.jAlert({
        'title': 'Error',
        'content': 'New Load and Demand Cannot be zero!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });

      // alert("New Load and Demand Cannot be zero!");
      return;
    }

    if ((revisedDemandValue - currentDemandValue == 0) && (revisedLoadValue - currentLoadValue == 0)) {

      $.jAlert({
        'title': 'Error',
        'content': 'New Load and Demand Cannot be same as old value!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("New Load and Demand Cannot be same as old value!");
      return;
    }

    var selectedValue = $("#selectCycle").val();
    if ((selectedValue == null) || (selectedValue == "")) {
      $.jAlert({
        'title': 'Error',
        'content': 'Please Select Revised Effective Date for Change in Contract Demand!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("Please Select Revised Effective Date for Change in Contract Demand!");
      return;
    }
    var pacLoadValue = (revisedLoadValue - currentLoadValue);
    var pacDemandValue = (revisedDemandValue - currentDemandValue);
    if (revisedDemandValue > parseInt(revisedLoadValue / 0.9)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand Cannot Exceed 111% of Connected Load!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert("Revised Demand cannot exceed 90% of Revised Load!");
      // $(this).val(parseInt(revisedLoadValue / 0.9));
      $('#revisedDemand').val(currentDemandValue);
      $('#PACtitle').addClass('hidden');
      return;
    }
    if (revisedDemandValue > 20 && tariffType == "Single Part") {
      $.jAlert({
        'title': 'Error',
        'content': 'For demand load greater than 20, Tariff Class must be Two Part!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('For demand load greater than 20, Tariff Class must be Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (tariffCatCode == "I2" && !(revisedDemandValue < 50)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand cannot be greater than 50 kVA in Small Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if ((tariffCatCode == "I3" && !(revisedDemandValue > 51)) || (tariffCatCode == "I3" && !(revisedDemandValue < 100))) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand should be in range 51-100 kVA in Medium Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (tariffCatCode == "I4" && !(revisedDemandValue > 100)) {
      $.jAlert({
        'title': 'Error',
        'content': 'Contract Demand cannot be Less than 100 kVA in Large Industry Power Supply!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if (revisedDemandValue < 21 && tariffType == "Two Part") {
      $.jAlert({
        'title': 'Error',
        'content': 'Demand load cannot be less than 20 for Two Part!',
        'theme': 'blue',
        'backgroundColor': 'white',
        'btns': [
          { 'text': 'OK', 'theme': 'blue' }
        ]
      });
      // alert('Demand load cannot be less than 20 for Two Part!');
      $('#revisedDemand').val(parseInt(currentDemandValue));
      return;
    }
    if ((pacDemandValue > 99) || (pacLoadValue > 99)) {
      // $('#PACtitle').css('visibility','visible');
      $('#PACtitle').removeClass('hidden');
    }
    else if ((pacDemandValue < 100) || (pacLoadValue < 100)) {
      // $('#PACtitle').css('visibility','hidden');
      $('#PACtitle').addClass('hidden');
    }

    var pacBox = $("#PACtitle");
    if (pacBox.is(":visible")) {
      // Validate the input box
      if ($('#pacInput').val().trim() === "") {
        $.jAlert({
          'title': 'Error',
          'content': 'Please enter PAC number!',
          'theme': 'blue',
          'backgroundColor': 'white',
          'btns': [
            { 'text': 'OK', 'theme': 'blue' }
          ]
        });
        // alert("Please enter PAC number!");
        return;
      }
    }

    //submit file

    // start of new addition
    var fileTestReportInput = $('#testRepDocInput')[0];
    var fileTestReport = fileTestReportInput.files[0];

    var changeLoad = $('#changeLoad').val();
    if (changeLoad !=="undefined" || changeLoad !== "" || changeLoad !== 0) {
      if (!fileTestReport) {
        $.jAlert({
          'title': 'Error',
          'content': 'Please upload test report required for load change!',
          'theme': 'blue',
          'backgroundColor': 'white',
          'btns': [
            { 'text': 'OK', 'theme': 'blue' }
          ]
        });
        return;
      }
      var maxFileSize = 1024 * 1024;
      var validFileName = /^[a-zA-Z0-9\-_\. ]+$/;
      var validFileNameChar = /^.{1,50}$/;
      var pdfFileType = 'application/pdf';
      if (fileTestReport.size > maxFileSize) {
        $.jAlert({
          'title': 'Error',
          'content': 'File Size must be less than 1 MB!',
          'theme': 'blue',
          'backgroundColor': 'white',
          'btns': [
            { 'text': 'OK', 'theme': 'blue' }
          ]
        });
        return;
      }
      else if (!validFileName.test(fileTestReport.name)) {
        $.jAlert({
          'title': 'Error',
          'content': 'File name must not contain special characters!',
          'theme': 'blue',
          'backgroundColor': 'white',
          'btns': [
            { 'text': 'OK', 'theme': 'blue' }
          ]
        });
        return;
      }
      else if (!validFileNameChar.test(fileTestReport.name)) {
        $.jAlert({
          'title': 'Error',
          'content': 'File name must be less than 50 characters in length!',
          'theme': 'blue',
          'backgroundColor': 'white',
          'btns': [
            { 'text': 'OK', 'theme': 'blue' }
          ]
        });
        return;
      }
      else if (fileTestReport.type !== pdfFileType) {
        $.jAlert({
          'title': 'Error',
          'content': 'File type must be PDF!',
          'theme': 'blue',
          'backgroundColor': 'white',
          'btns': [
            { 'text': 'OK', 'theme': 'blue' }
          ]
        });
        return;
      }
    }

    

    var loadItemsRows = $('#myTable tr').length;
    if (loadItemsRows > 0) {
      // Iterate through each table row
      $('#myTable tbody tr').each(function () {
        var rowData = [];
        loadItems += $(this).find('.loadItem').text() + "#";
        loadItems += $(this).find('.LoadItemInWatt').text() + "#";
        loadItems += $(this).find('.LoadItemQuantity').text() + "#";
        loadItems += $(this).find('.LoadItemTotalWatts').text() + "#";
        loadItems += $(this).find('.loadItemRemarks').text() + "#$#";
      });
      formData.append('loadItems', loadItems);
    }
    console.log(formData);
    $.ajax({
      type: 'POST',
      url: 'PHP/LCProcess.php',
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function () {
        $('#submitFormBtn').attr("disabled", "disabled");
        $('#formLC').css("opacity", ".5");
      },
      success: function (data) {
        // alert("Success : " + status);// to remove in production
        console.table(data);// to remove in production
        var objJSON = JSON.parse(data)
        $('#submitFormBtn').removeAttr("disabled");
        $('#formLC').css("opacity", "");
        if (objJSON.status === 1) {
          // alert("Service order number : " + objJSON.serviceOrderNo);
          $.jAlert({
            'title': 'Success',
            'content': 'Service order number : ' + objJSON.serviceOrderNo,
            'theme': 'blue',
            'backgroundColor': 'white',
            'btns': [
              { 'text': 'OK', 'theme': 'blue' }
            ]
          });
          $("#soNo").text(objJSON.serviceOrderNo);
          $('#mainFormDiv').hide();
          $('#onSuccessForm').show();
        } else if (objJSON.status === 0) {
          // alert(objJSON.errorCode + " : " + objJSON.errorMsg);
          var errors = "";
          var errorMessage = "";
          if (objJSON['errors'] && (objJSON.errors).length != 0) {
            $.each(objJSON.errors, function (index, value) {
              errors += value + "</br>";
            });
          }

          $.jAlert({
            'title': 'Error',
            'content': objJSON.errorCode + " : " + objJSON.errorMsg + "</br>" + errors,
            'theme': 'blue',
            'backgroundColor': 'white',
            'btns': [
              { 'text': 'OK', 'theme': 'blue' }
            ]
          });
        } else {
          // alert("Something went wrong, Please try again later after sometime.");
          $.jAlert({
            'title': 'Error',
            'content': 'Something went wrong, Please try again later after sometime.',
            'theme': 'blue',
            'backgroundColor': 'white',
            'btns': [
              { 'text': 'OK', 'theme': 'blue' }
            ]
          });
        }
      },
      error: function (request, textstatus, message) {
        // alert("Error : " + textstatus);// to remove in production
        console.table(request);// to remove in production
        // var objJSON = JSON.parse(data)
        $('#submitFormBtn').removeAttr("disabled");
        $('#formLC').css("opacity", "");
        if (textstatus === "timeout") {
          // alert("We are not able to connect to our server in this moment, kindly try again later.");
          $.jAlert({
            'title': 'Error',
            'content': 'We are not able to connect to our server in this moment, kindly try again later.',
            'theme': 'blue',
            'backgroundColor': 'white',
            'btns': [
              { 'text': 'OK', 'theme': 'blue' }
            ]
          });
        } else if (request.status === 0) {
          // alert("No network, please check your connectivity and try again.");
          $.jAlert({
            'title': 'Error',
            'content': 'No network, please check your connectivity and try again.',
            'theme': 'blue',
            'backgroundColor': 'white',
            'btns': [
              { 'text': 'OK', 'theme': 'blue' }
            ]
          });
        } else {
          // alert("Something went wrong, Please try again later after sometime.");
          $.jAlert({
            'title': 'Error',
            'content': 'Something went wrong, Please try again later after sometime.',
            'theme': 'blue',
            'backgroundColor': 'white',
            'btns': [
              { 'text': 'OK', 'theme': 'blue' }
            ]
          });
        }
      }
    });//$.ajax({});

    // end of new addition
    // removal of below code block
    /*  if (flagSuccessful) {
        // Perform the submit action if the flag is successful
        // ...
      } else {
        if (!fileTestReport) {
          $.jAlert({
            'title': 'Error',
            'content': 'Please upload required document before submitting!',
            'theme': 'blue',
            'backgroundColor': 'white',
            'btns': [
            {'text':'OK', 'theme':'blue'}
               ]
           });
          // alert('Please upload required document before submitting!');
        } else {
          $('#mainFormDiv').hide();
          $('#onSuccessForm').show();
          // $.jAlert({
          //   'title': 'Error',
          //   'content': 'Form submitted successfully!',
          //   'theme': 'blue',
          //   'backgroundColor': 'white',
          //   'btns': [
          //   {'text':'OK', 'theme':'blue'}
          //      ]
          //  });
          // alert('Form submitted successfully!');
        } */
    // }
  });

});   