$(document).ready(function () {

    //input click
    $(document).on('click', '.row_data', function (event) {
        event.preventDefault();

        $(this).focus();
        document.execCommand('selectAll', false, null);

        
        let tbl_row = $(this).closest('tr');

        let tblArr = {};

        let firstQuarter = 0;
        let secondQuarter = 0;
        let avg = 0.0;

        $(':input').on('propertychange input', function (e) {
            var valueChanged = false;
        
            if (e.type=='propertychange') {
                valueChanged = e.originalEvent.propertyName=='value';
            } else {
                valueChanged = true;
            }
            if (valueChanged) {
                /* Code goes here */
                if($(this).val().length>1){
                    tbl_row.find('.row_data').each(function (index, val) {
           
                        let col_name = $(this).attr('name');
                        let col_val = $(this).val();
                        tblArr[col_name] = parseInt(col_val);
            
            
                        firstQuarter = parseInt(tblArr['firstQuarter']);
                        secondQuarter = parseInt(tblArr['secondQuarter']);
            
                        if (firstQuarter == 0 || secondQuarter == 0) {
                            return;
                        }
            
                        avg = parseFloat((firstQuarter + secondQuarter) / 2);
                        if (firstQuarter == 0) {
                            avg = 0;
                        } else if (secondQuarter == 0) {
                            avg = 0;
                        }
            
                        if (avg < 75 && avg != 0) {
                            tbl_row.find('.row_data').filter(':not([name]), [name="remark"]').val("Failed");
                        }
                        else if (avg > 75) {
                            tbl_row.find('.row_data').filter(':not([name]), [name="remark"]').val("Passed");
                        }
                        else {
                            tbl_row.find('.row_data').filter(':not([name]), [name="remark"]').val("");
                        }
            
                        if (!isNaN(avg)) {
                            tbl_row.find('.row_data').filter(':not([name]), [name="finalGrade"]').val(avg);
                        } else {
                            tbl_row.find('.row_data').filter(':not([name]), [name="finalGrade"]').val('');
                            tbl_row.find('.row_data').filter(':not([name]), [name="remark"]').val("");
                        }
            
                    });
                }
            }
        });
    });




    // $(document).on('focusout', '.row_data', function (event) {
    //     event.preventDefault();

    //     let tbl_row = $(this).closest('tr');

    //     let tblArr = {};

    //     let firstQuarter = 0;
    //     let secondQuarter = 0;
    //     let avg = 0.0;



    //     tbl_row.find('.row_data').each(function (index, val) {

    //         let col_name = $(this).attr('name');
    //         let col_val = $(this).val();
    //         tblArr[col_name] = parseInt(col_val);


    //         firstQuarter = parseInt(tblArr['firstQuarter']);
    //         secondQuarter = parseInt(tblArr['secondQuarter']);



    //         if (firstQuarter == 0 || secondQuarter == 0) {
    //             return;
    //         }

    //         avg = parseFloat((firstQuarter + secondQuarter) / 2);
    //         if (firstQuarter == 0) {
    //             avg = 0;
    //         } else if (secondQuarter == 0) {
    //             avg = 0;
    //         }

    //         if (avg < 75 && avg != 0) {
    //             $(this).filter(':not([name]), [name="remark"]').val("Failed");
    //         }
    //         else if (avg > 75) {
    //             $(this).filter(':not([name]), [name="remark"]').val("Passed");
    //         }
    //         else {
    //             $(this).filter(':not([name]), [name="remark"]').val('');
    //         }

    //         if (!isNaN(avg)) {
    //             $(this).filter(':not([name]), [name="finalGrade"]').val(avg);
    //         } else {
    //             $(this).filter(':not([name]), [name="finalGrade"]').val('');
    //             $(this).filter(':not([name]), [name="remark"]').val('')
    //         }

    //     });

    // });

    $("input").keypress(function (evt) {
        evt = evt ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    });

});




function onLimit100(val) {
    if (Number(val.value) > 100) {
        val.value = 100;
    }
}


// input checker > number only
