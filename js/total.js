
//  --------------------------   button functions ------------------- 

// function scrollToNextStep2() {
//   const currentStep = document.querySelector('.step2');
//   currentStep.classList.add('active');
//     currentStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
// }

function scrollToNextStep3() {
    const currentStep = document.querySelector('.step3');
    currentStep.classList.add('active');
    currentStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function scrollToNextStep4() {
    const currentStep = document.querySelector('.step4');
    currentStep.classList.add('active');
    currentStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  
// ----------------------  GoHP Subsidy field ----------------------------


    const multipleConnectionsRadio = document.getElementById('multipleConnections');
    const gohpSubsidyField = document.getElementById('gohpSubsidyField');

    multipleConnectionsRadio.addEventListener('change', function () {
        if (this.checked) {
            gohpSubsidyField.style.display = 'block';
        } else {
            gohpSubsidyField.style.display = 'none';
        }
    });
  

//  ------------------------------ costome info table ---------------------

    $(document).ready(function () {

        // +button
        function toggleAddButtonVisibility() {
            var isChecked = $("#multipleConnections").prop("checked");
            if (isChecked) {
                $("#addNewRowBtn").show();
                $("#consumerTable tbody tr:gt(0)").show();
            } else {
                $("#addNewRowBtn").hide();
                $("#consumerTable tbody tr:gt(0)").hide();
            }
        }

        toggleAddButtonVisibility();

        $("#electricityConnectionType input[type='radio']").change(function () {
            toggleAddButtonVisibility();
        });

        $("#addNewRowBtn").click(function () {
            var newRow = $("<tr>");
            var cols = "";

            cols += '<td><input class="multisteps-form__input form-control" type="text" name="consumerId"></td>';
            cols += '<td><input class="multisteps-form__input form-control" type="text" name="consumerName"></td>';
            cols += '<td><input class="multisteps-form__input form-control" type="text" name="tariffCategory"></td>';
            cols += '<td><input class="multisteps-form__input form-control" type="text" name="connectedLoad"></td>';
            cols += '<td><input class="multisteps-form__input form-control" type="text" name="mobileNo"></td>';
            cols += '<td><input class="multisteps-form__input form-control" type="text" name="address"></td>';
            cols += '<td><input class="multisteps-form__input form-control" type="text" name="esdName"></td>';

            cols += '<td><button class="btn btn-danger remove-row">-</button></td>';
            newRow.append(cols);
            $("#consumerTable tbody").append(newRow);
//remove id show 
            $("#consumerTable th:nth-child(8), #consumerTable td:nth-child(8)").show();
        });

        // - button
        $("#consumerTable").on("click", ".remove-row", function () {
            $(this).closest("tr").remove();

            if ($("#consumerTable tbody tr").length === 0) {
                $("#consumerTable th:nth-child(8), #consumerTable td:nth-child(8)").hide();
            }
        });
    });


    
                            // <!-- ----------------------------- table script -------------------------- -->
                            
                            // <!--
                            // <script>
                            //     function addNewRow() {
                            //         const table = document.getElementById('consumerTable').getElementsByTagName('tbody')[0];
                            //         const newRow = table.insertRow(table.rows.length);
                            //         const cells = [];
                            //         for (let i = 0; i < 7; i++) {
                            //             cells[i] = newRow.insertCell(i);
                            //             const input = document.createElement('input');
                            //             input.className = 'multisteps-form__input form-control';
                            //             input.type = 'text';
                            //             input.name = `newField${i}`;
                            //             cells[i].appendChild(input);
                            //         }
                            //     }
                            //     const addNewRowBtn = document.getElementById('addNewRowBtn');
                            //     addNewRowBtn.addEventListener('click', addNewRow);
                            // </script> -->