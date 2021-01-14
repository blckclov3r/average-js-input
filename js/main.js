$(document).ready(function () {


   $('tr').each(function(){

       let tblArr = {};

       $(this).find('.row_data').each(function(){
        let col_name = $(this).attr('col_name');
        let col_val = $(this).val();
        tblArr[col_name] = parseInt(col_val);
        

        firstQuarter = parseInt(tblArr['firstQuarter']);
        secondQuarter = parseInt(tblArr['secondQuarter']);

        avg = parseFloat((firstQuarter + secondQuarter) / 2);

        $(this).filter(':not([col_name]), [col_name="finalGrade"]').val(avg);

        if(avg >= 75){
            $(this).filter(':not([col_name]), [col_name="remark"]').val('Passed').css("color","green");
         
        }else if(avg == ''){
            $(this).filter(':not([col_name]), [col_name="remark"]').val('');
        }else{
            $(this).filter(':not([col_name]), [col_name="remark"]').val('Fail').css("color","red");
        }
       });


    });


   


    //focus & select all
    $("input[type=text]").focus(function() { 
        var save_this = $(this);
        window.setTimeout (function(){ 
           save_this.select(); 
        },100);
    });


    //onClick input
    $(document).on('click', '.row_data', function (event) {
        event.preventDefault();

        $(':input').on('propertychange input', function (e) {
            var valueChanged = false;
        
            if (e.type=='propertychange') {
                valueChanged = e.originalEvent.propertyName=='value';
            } else {
                valueChanged = true;
            }
            if (valueChanged) {

                /* Code goes here */

                let tbl_row = $(this).closest('tr');

                let tblArr = {};

                let firstQuarter = 0;
                let secondQuarter = 0;
                let avg = 0.0;

                if (Number($(this).val()) > 100) {
                    $(this).val(100);
                }else if($(this).val().length <2){
                    tbl_row.find('.row_data').each(function (index, val) {

                        $(this).filter(':not([col_name]), [col_name="finalGrade"]').val('');
                        $(this).filter(':not([col_name]), [col_name="remark"]').val('');

                    });
                }

                if($(this).val().length>1){
                    tbl_row.find('.row_data').each(function (index, val) {
           
                        let col_name = $(this).attr('col_name');
                        let col_val = $(this).val();
                        tblArr[col_name] = parseInt(col_val);
                        

                        firstQuarter = parseInt(tblArr['firstQuarter']);
                        secondQuarter = parseInt(tblArr['secondQuarter']);


                        if (firstQuarter == 0 || secondQuarter == 0) {
                            return;
                        }
            
                        avg = parseFloat((firstQuarter + secondQuarter) / 2);
                
            
                        if (avg < 75 && avg != 0) {
                            $(this).filter(':not([col_name]), [col_name="remark"]').val("Failed").css("color","red");
                        }
                        else if (avg > 75) {
                            $(this).filter(':not([col_name]), [col_name="remark"]').val("Passed").css("color","green");
                        }
                        else {
                            $(this).filter(':not([col_name]), [col_name="remark"]').val('');
                        }
            
                        if (!isNaN(avg)) {
                            $(this).filter(':not([col_name]), [col_name="finalGrade"]').val(avg);
                        } else {
                            $(this).filter(':not([col_name]), [col_name="finalGrade"]').val('');
                            $(this).filter(':not([col_name]), [col_name="remark"]').val('');
                            // tbl_row.find('.row_data').filter(':not([col_name]), [col_name="remark"]').val('');
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

    //         let col_name = $(this).attr('col_name');
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
    //             $(this).filter(':not([col_name]), [col_name="remark"]').val("Failed");
    //         }
    //         else if (avg > 75) {
    //             $(this).filter(':not([col_name]), [col_name="remark"]').val("Passed");
    //         }
    //         else {
    //             $(this).filter(':not([col_name]), [col_name="remark"]').val('');
    //         }

    //         if (!isNaN(avg)) {
    //             $(this).filter(':not([col_name]), [col_name="finalGrade"]').val(avg);
    //         } else {
    //             $(this).filter(':not([col_name]), [col_name="finalGrade"]').val('');
    //             $(this).filter(':not([col_name]), [col_name="remark"]').val('')
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
