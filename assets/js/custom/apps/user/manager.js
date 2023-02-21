// Functions
$(document).ready(function () {

    $("html body#kt_body div.d-flex.flex-column.flex-root div.d-flex.flex-column.flex-column-fluid.flex-lg-row.justify-content-center div.d-flex.flex-center.w-lg-50.p-10 div.card.rounded-1.w-md-550px div.card-body.p-10.p-lg-6 form#Register.form.w-100.fv-plugins-bootstrap5.fv-plugins-framework div.d-grid.mb-10 button.btn.btn-sm.btn-light-primary.fs-5.fw-bold.py-1").click(function () {
        Register();
    });

    $("html body#kt_body div.d-flex.flex-column.flex-root div.d-flex.flex-column.flex-column-fluid.flex-lg-row.justify-content-center div.d-flex.flex-center.w-lg-50.p-10 div.card.rounded-1.w-md-550px div.card-body.p-10.p-lg-6 form#Login.form.w-100.fv-plugins-bootstrap5.fv-plugins-framework div.d-grid.mb-10 button.btn.btn-sm.btn-light-primary.fs-5.fw-bold.py-1").click(function () {
        Login();
    });

    $("html body#kt_body div.d-flex.flex-column.flex-root div.page.d-flex.flex-row.flex-column-fluid div.wrapper.d-flex.flex-column.flex-row-fluid div.content.d-flex.flex-column.flex-column-fluid div.d-flex.flex-column-fluid.align-items-start.container-fluid div.content.flex-row-fluid div.row.g-5.g-xl-8 div.col-sm-7.col-xxl-8 div.card div.card-header form#stopall.card-toolbar button.btn.btn-sm.btn-light-danger.fw-bold").click(function () {
        StopAll();
    });

    $("html body#kt_body div.d-flex.flex-column.flex-root div.page.d-flex.flex-row.flex-column-fluid div.wrapper.d-flex.flex-column.flex-row-fluid div.content.d-flex.flex-column.flex-column-fluid div.d-flex.flex-column-fluid.align-items-start.container-fluid div.content.flex-row-fluid div.row.g-5.g-xl-8 div.col-sm-5.col-xxl-4 div.card div.card-body div#myTabContent.tab-content form#Launch4 div.d-flex.flex-center button.btn.btn-sm.btn-light-primary.fs-5.fw-bold.py-1").click(function () {
        StartLayer4();
    });

    $("html body#kt_body div.d-flex.flex-column.flex-root div.page.d-flex.flex-row.flex-column-fluid div.wrapper.d-flex.flex-column.flex-row-fluid div.content.d-flex.flex-column.flex-column-fluid div.d-flex.flex-column-fluid.align-items-start.container-fluid div.content.flex-row-fluid div.row.g-5.g-xl-8 div.col-sm-5.col-xxl-4 div.card div.card-body div#myTabContent.tab-content form#Launch7 div.d-flex.flex-center button.btn.btn-sm.btn-light-primary.fs-5.fw-bold.py-1").click(function () {
        StartLayer7();
    });

    $('html body#kt_body div.d-flex.flex-column.flex-root div.page.d-flex.flex-row.flex-column-fluid div.wrapper.d-flex.flex-column.flex-row-fluid div.content.d-flex.flex-column.flex-column-fluid div.d-flex.flex-column-fluid.align-items-start.container div.content.flex-row-fluid div.row.mb-1 div.plan-body div.row div.col-sm-3.col-xxl-3 div.card.plan-price.card-flush.mb-5.border-radius-sm div.card-footer.d-flex.justify-content-center form button.btn.btn-sm.btn-primary.fw-bold').click(function (event) {
        var data = event.target;
        var ok = $(data).parents('form').attr('id');
        var res = ok.split("Purchase");
        Purchase(res[1]);
    });

    $('html body#kt_body div.d-flex.flex-column.flex-root div.page.d-flex.flex-row.flex-column-fluid div.wrapper.d-flex.flex-column.flex-row-fluid div.content.d-flex.flex-column.flex-column-fluid div.d-flex.flex-column-fluid.align-items-start.container-fluid div.content.flex-row-fluid div.row.g-2.mb-2 div.col-xl-12 div.card div.card-body  form#CreateApi div.card-footer.pt-1.pb-0.d-flex.justify-content-center button.btn.btn-sm.btn-light-primary.fs-5.fw-bold.py-1.mt-3').click(function () {
        GenerateApi();
    });

});

$(document).ready(function () {
    let $methodSelect = $('#method-select').select2();

    let sections = [
        {id: "connection-section", allowedValues: ['14', '27']},
    ];

    //function show or hide sections
    function toggleSections() {
        let selectedValue = $methodSelect.val();
        sections.forEach(({id, allowedValues}) => {
            if (!allowedValues.length || allowedValues.includes(selectedValue)) {
                $(`#${id}`).show();
            } else {
                $(`#${id}`).hide();
            }
        });
    }

    $methodSelect.on('change', toggleSections);
    toggleSections();

    // Display or hide Post Data input
    $('input[name="requestmethod"]').on('change', function () {
        var isPostMethod = $(this).val() == 'POST';
        $('#postdata').toggle(isPostMethod);
    });

});

/* Register Function */
function Register() {
// Create ajax form
    let formData = new FormData(document.querySelector('#Register'));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);
// Send ajax request
    $.ajax({
        url: 'process?Register',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);

            //Alert
            showAlert(res[1], res[0]);
            if (res[0] == 'success') {
                setTimeout(function () {
                    window.location.href = 'login';
                }, 500);
            }
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

/* Login Function */
function Login() {
// Create ajax form
    let formData = new FormData(document.querySelector('#Login'));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);
// Send ajax request
    $.ajax({
        url: 'process?Login',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);

            showAlert(res[1], res[0], '');
            if (res[0] == 'success') {
                setTimeout(function () {
                    window.location.href = 'dashboard';
                }, 500);
            }
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

/* Add Balance */
function CreateInvoice() {
    // Create ajax form
    let formData = new FormData(document.querySelector('#CreateInvoice'));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);

    // Send ajax request
    $.ajax({
        url: 'process?CreateInvoice',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            var res = JSON.parse(r);
            showAlert(res[1], res[0]);
            if (res[0] == 'success') {
                setTimeout(function () {
                    window.location.href = '/invoices';
                }, 1000);
            }
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}


/* Buy Plan */
function Purchase(id) {
// Create ajax form
    let formData = new FormData(document.querySelector('#Purchase' + id));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);
// Send ajax request
    $.ajax({
        url: 'process?Purchase',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);
            // Alert
            showAlert(res[1], res[0]);
            if (res[0] == 'success') {
                setTimeout(function () {
                    window.location.replace("purchase");
                }, 500);
            }
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

/* Buy Plan */
function PurchaseCustom() {
// Create ajax form
    let formData = new FormData(document.querySelector('#PurchaseCustom'));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);
// Send ajax request
    $.ajax({
        url: 'process?BuyCustomPlan',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);
            // Alert
            showAlert(res[1], res[0]);
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

async function StartLayer4() {
    // Get the value of the input with id "slots"
    const slots = document.querySelector('.slotsl4').value;

    for (let i = 0; i < slots; i++) {
        // Create ajax form
        const formData = new FormData(document.querySelector('#Launch4'));

        let _csrf = $('input[id="_csrf"]').attr('value');
        formData.append('_csrf', _csrf);

        try {
            // Send ajax request
            const response = await $.ajax({
                url: 'process?StartLayer4',
                type: 'POST',
                contentType: false,
                cache: false,
                processData: false,
                data: formData
            });

            const res = JSON.parse(response);
            $('.attacks-table').DataTable().ajax.reload();
            showAlert(res[1], res[0]);

            if (res[0] === 'error') {
                return false;
            }
        } catch (err) {
            // Stop making requests if this one fails
            return false;
        }
    }
}


async function StartLayer7() {
    // Get the value of the input with id "slots"
    const slots = document.querySelector('.slotsl7').value;

    for (let i = 0; i < slots; i++) {
        // Create ajax form
        const formData = new FormData(document.querySelector('#Launch7'));

        let _csrf = $('input[id="_csrf"]').attr('value');
        formData.append('_csrf', _csrf);

        try {
            // Send ajax request
            const response = await $.ajax({
                url: 'process?StartLayer7',
                type: 'POST',
                contentType: false,
                cache: false,
                processData: false,
                data: formData
            });

            const res = JSON.parse(response);
            $('.attacks-table').DataTable().ajax.reload();
            showAlert(res[1], res[0]);

            if (res.status === 'error') {
                // Stop making requests if this one fails
                return false;
            } else if (res.status === 'warning') {
                // If the result is a warning, re-launch the request with the same values
                continue;
            }
        } catch (err) {
            // Stop making requests if this one fails
            return false;
        }
    }
}


/* Stop Attack */
function Stop(id) {
    // Create ajax form
    let formData = new FormData(document.querySelector('#Stop' + id));
    // Send ajax request
    $.ajax({
        url: 'process?Stop',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            var res = JSON.parse(r);
            showAlert(res[1], res[0]);
            // Refresh tables with class 'tab-table'
            $('.attacks-table').DataTable().ajax.reload();
        },
        error: function (err) {
            return false;
        }
    });
}


/* Stop All Attacks */
function StopAll() {
// Create ajax form
    let formData = new FormData(document.querySelector('#stopall'));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);
// Block button
    $("#blockUIall").addClass("disabled")
    // Send ajax request
    $.ajax({
        url: 'process?StopAll',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);
            showAlert(res[1], res[0]);
            // Refresh tables with class 'tab-table'
            $('.attacks-table').DataTable().ajax.reload();
        },
        error: function (err) {
            return false;
        }
    });
}

/* Change Profile */
function UpdateProfile() {
// Create ajax form
    let formData = new FormData(document.querySelector('#UpdateProfile'));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);

// Send ajax request
    $.ajax({
        url: 'process?UpdateProfile',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);
            if (res[0] == 'success') {
                setTimeout(function () {
                    window.location.replace("profile");
                }, 1000);
            }
            // Alert
            showAlert(res[1], res[0]);
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

/* Generate api_key */
function GenerateApi() {
// Create ajax form
    let formData = new FormData(document.querySelector('#CreateApi'));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);
// Send ajax request
    $.ajax({
        url: 'process?GenerateApi',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);
            if (res[0] == 'success') {
                setTimeout(function () {
                    window.location.replace("api");
                }, 500);
            }
            // Alert
            showAlert(res[1], res[0]);
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

/* Delete api_key */
function DeleteApi(id) {
// Create ajax form
    let formData = new FormData(document.querySelector('#DeleteApi' + id));
    let _csrf = $('input[id="_csrf"]').attr('value');
    formData.append('_csrf', _csrf);
// Send ajax request
    $.ajax({
        url: 'process?RemoveApi',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);
            if (res[0] == 'success') {
                setTimeout(function () {
                    window.location.replace("api");
                }, 500);
            }
            // Alert
            showAlert(res[1], res[0]);
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

/* Delete Account */
function DeleteAccount() {
// Create ajax form
    let formData = new FormData(document.querySelector('#DeleteAccount'));
// Send ajax request
    $.ajax({
        url: 'process?DeleteUser',
        type: 'POST',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function (r) {
            // console.log(r);
            // return false;
            var res = JSON.parse(r);
            window.location.reload()
            // Alert
            showAlert(res[1], res[0]);
            return false;
        },
        error: function (err) {
            return false;
        }
    });
}

/* Toastr function */
const toastrOptions = {
    closeButton: true,
    debug: false,
    progressBar: true,
    newestOnTop: true,
    positionClass: "toastr-top-center",
    preventDuplicates: false,
    onclick: null,
    showDuration: "3000",
    hideDuration: "2000",
    timeOut: "2000",
    extendedTimeOut: "2000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};

function showAlert(message, type) {
    switch (type) {
        case "success":
            toastr.success(message, null, toastrOptions);
            break;
        case "error":
            toastr.error(message, null, toastrOptions);
            break;
        case "info":
            toastr.info(message, null, toastrOptions);
            break;
        case "warning":
            toastr.warning(message, null, toastrOptions);
            break;
        default:
            break;
    }
}


/* Register Captcha */
function CaptchaRegister() {
// $('#CaptchaImg').html('request/captcha/');
    document.getElementById("CaptchaImg").src = "captcha";
    return false;
}

function countdown(element, seconds) {
    const interval = setInterval(function () {
        seconds--;
        element.innerHTML = seconds;
        // If the countdown has expired, remove the row from the table
        if (seconds <= 0) {
            let row = $(element).closest('tr');
            let table = $('.attacks-table').DataTable();
            row.fadeOut(function () {
                table.row(row).remove().draw();
            });
            return;
        }
    }, 1000);
}

$(document).ready(function () {
    let table = $('.attacks-table').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "order": [],
        "columnDefs": [
            {
                "targets": [0],
                "visible": true,
                "searchable": true
            }
        ],
        'pageLength': 5,
        "lengthMenu": [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
        "processing": true,
        "serverSide": false,
        'language': {
            emptyTable: `<div class="d-flex flex-center mt-4">
                    <div class="fs-6 fw-bold text-muted">Start new attack</div>
                </div>`,
            "processing": "<span class='spinner-border spinner-border-sm mr-2' role='status'></span>"
        },
        "ajax": {
            "url": "/main/api/attacks",
            "type": "POST",
            "data": function (data) {
                return data;
            },
            "dataSrc": function (json) {
                return json.data;
            }
        },
        "columns": [
            {
                "data": "target", "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).addClass('fw-bold text-muted');
                }
            },
            {
                "data": "time", "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).addClass('fw-bold text-muted');
                    countdown(td, cellData);
                }
            },
            {
                "data": "method", "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).addClass('fw-bold text-muted');
                }
            },
            {
                "data": "handler", "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).addClass('fw-bold text-muted');
                }
            },
            {
                "data": "id", "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).html(`<form method="POST" id="Stop${cellData}"><input type="hidden" id="_csrf" name="_csrf" value="${rowData.csrftoken}"><input type="hidden" id="id" name="id" value="${cellData}"><button type="button" class="btn btn-sm btn-danger fw-bold py-2" onclick="Stop(${cellData})">STOP</button></form>`);
                }
            }
        ]
    });
});

$(document).ready(function () {
    $('.slotsl7').attr('value', 1).on('input', function () {
        $('.slider_slotsl7').text($(this).val());
    });
});

$(document).ready(function () {
    $('.slotsl4').attr('value', 1).on('input', function () {
        $('.slider_slotsl4').text($(this).val());
    });
});

function calculatePrice(time, slots, month) {
    // fixed price for time
    var price = 50 * (time / 3600);

    // fixed price for slots
    price += 50 * (slots - 1);

    // add additional price for each additional month
    if (month > 1) {
        price += price * (month - 1);
    }

    // apply discount if more than 50 slots are selected
    if (slots >= 50) {
        price *= 0.9; // 10% discount
    }

    // apply discount if more than 5 slots are selected
    if (slots >= 5) {
        price *= 0.9; // 10% discount
    }

    // apply discount if more than 32,000 seconds of time are selected
    if (time >= 32000) {
        price *= 0.9; // 10% discount
    }

    // apply discount if more than 3 months are selected
    if (month >= 3) {
        price *= 0.9; // 10% discount
    }

    // round the price to 2 decimal places
    return price.toFixed(2);
}

$(document).ready(function () {

    $("#time").change(function () {
        // get the values of the time, slots, and month input fields
        var time = $("#time").val();
        var slots = $("#slots").val();
        var month = $("#month").val();

        // calculate the price
        var price = calculatePrice(time, slots, month);

        // set the value of the price input field
        $("#price").val(price);
    });

    $("#slots").change(function () {
        // get the values of the time, slots, and month input fields
        var time = $("#time").val();
        var slots = $("#slots").val();
        var month = $("#month").val();

        // calculate the price
        var price = calculatePrice(time, slots, month);

        // set the value of the price input field
        $("#price").val(price);
    });

    $("#month").change(function () {
        // get the values of the time, slots, and month input fields
        var time = $("#time").val();
        var slots = $("#slots").val();
        var month = $("#month").val();

        // calculate the price
        var price = calculatePrice(time, slots, month);

        // set the value of the price input field
        $("#price").val(price);
    });

});