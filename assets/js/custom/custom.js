(function (jQuery) {
    "user strict";

    $(document).ready(function() {
        $("#wallet").click(function() {
            var text = $(this).text();
            copyToClipboard(text);
            $(this).removeClass("text-gray-400").addClass("text-success");
            setTimeout(function() {
                $("#wallet").removeClass("text-success").addClass("text-gray-400");
            }, 3000);
        });

        function copyToClipboard(text) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(text).select();
            document.execCommand("copy");
            $temp.remove();
        }
    });

    $("#amount").click(function(){
        var dataAmount = $(this).data("amount");
        $(this).val(dataAmount);
        var copyText = document.getElementById("amount");
        copyText.select();
        document.execCommand("copy");
        alert("Copied the text: " + dataAmount);
    });

    jQuery(document).ready(function () {
        $("#kt_datepicker_2").flatpickr();

        // Format options
        function matchCustom(params, data) {
            // If there are no search terms, return all of the data
            if ($.trim(params.term) === '') {
                return data;
            }

            // Do not display the item if there is no 'text' property
            if (typeof data.text === 'undefined') {
                return null;
            }

            // `params.term` should be the term that is used for searching
            // `data.text` is the text that is displayed for the data object
            if (data.text.indexOf(params.term) > -1) {
                var modifiedData = $.extend({}, data, true);
                modifiedData.text += ' (matched)';

                // You can return modified objects from here
                // This includes matching the `children` how you want in nested data sets
                return modifiedData;
            }

            // Return `null` if the term should not be displayed
            return null;
        }

        const optionFormat = (item) => {
            if (!item.id) {
                return item.text;
            }

            var span = document.createElement('span');
            var template = '';

            template += '<div class="d-flex align-items-center">';
            template += '<img src="' + item.element.getAttribute('data-kt-rich-content-icon') + '" class="rounded-circle h-40px me-3" alt="' + item.text + '"/>';
            template += '<div class="d-flex flex-column">'
            template += '<span class="fs-4 fw-bold lh-1">' + item.text + '</span>';
            template += '<span class="text-muted fs-5">' + item.element.getAttribute('data-kt-rich-content-subcontent') + '</span>';
            template += '</div>';
            template += '</div>';

            span.innerHTML = template;

            return $(span);
        }

        /* Init:: Select2 */
        $('#user_select').select2({
            placeholder: "Select an option",
            minimumResultsForSearch: Infinity,
            templateSelection: optionFormat,
            templateResult: optionFormat,
            matcher: matchCustom,
            minimumInputLength: 1
        });

        $('#kt_docs_select2_country').select2({
            templateSelection: optionFormat,
            templateResult: optionFormat
        });

        $(".default").DataTable();

        //Monitoring
        $(".monitoring-table").DataTable({
            paging: false,
            searching: false,
            autoWidth: true,
            searchDelay: 500,
            ordering: false,
            autoWidth: true,
            processing: false,
            pageLength: 10,
            info: false,
            pagingType: "simple_numbers",
            lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
            language: {
                emptyTable: '<span class="fw-bold">There are no active servers</span>'
            }
        });


        //Other
        $(".tab-table").DataTable({
            paging: true,
            searching: true,
            searchDelay: 500,
            ordering: false,
            autoWidth: true,
            processing: true,
            pageLength: 10,
            info: false,
            pagingType: "simple_numbers",
            lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
            language: {
                emptyTable: 'No data available in table',
                info: 'Showing _START_ to _END_ of _TOTAL_ entries'
            }
        });

        //*  */Init:: Loader */
        jQuery("#loading").delay().fadeOut(500);

        /* Init:: Check Width */
        function checkWidth(init) {
            /*If browser resized, check width again */
            if ($(window).width() < 900) {
                $('#kt_aside_menu').removeClass('my-auto');
            }
        }

        $(document).ready(function () {
            checkWidth(true);

            $(window).resize(function () {
                checkWidth(false);
            });
        });

        /* Init:: Dublicate particle class */

        function duplicateDiv() {
            // Select the div element with the class firefly
            var $div = $('.firefly');

            // Clone the div element 14 times
            for (var i = 0; i < 14; i++) {
                $div.clone().appendTo('#particle');
            }
        }

        $(document).ready(function () {
            duplicateDiv();
        });


        function setSameHeight() {
            var heights = $('.plan-price').map(function () {
                return $(this).height();
            }).get();
            var maxHeight = Math.max.apply(null, heights);
            $('.plan-price').height(maxHeight);
        }

        $(document).ready(function () {
            setSameHeight();
        });

    });
})(jQuery);