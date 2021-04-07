// helpers
function emailValidation(email, fb) {
    if (email.val().match(/^[a-zA-Z0-9]+@[a-zA-Z]{3,}.[a-zA_Z]{2,3}$/)) {
        email.addClass("is-valid");
        fb.addClass('valid-feedback').html("Looks Good!");
        return true;
    } else {
        var err = "";
        if (email.val().trim() === "") {
            err += "Email should not be empty.";
        } else {
            err += "Please enter a valid email address.";
        }
        email.addClass("is-invalid");
        fb.addClass('invalid-feedback').html(err);
        return false;
    }
}

function nameValidation(name, fb, min, max) {
    if (name.val().match(/^[a-zA-Z][a-zA-Z\s]*$/) && name.val().length > min && name.val().length <= max && name.val().length > 1) {
        name.addClass("is-valid");
        fb.addClass('valid-feedback').html("Looks Good!");
        return true;
    } else {
        name.addClass("is-invalid");
        fb.addClass('invalid-feedback').html("It should be between " + min + " and " + max + " alphabetic characters.");
        return false;
    }
}

function passwordValidation(pass, passFb, confirmPass, confirmPassFb) {
    var result = true;
    if (!pass.val().match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/)) {
        var err = "";
        if (pass.val().length > 20 || pass.val().length < 8) {
            err += "<li>Password should be between 8 and 20 characters.</li>";
        }
        if (!/\d/.test(pass.val())) {
            err += "<li>Password should contain at least one digit.</li>";
        }
        if (!/[A-Z]/.test(pass.val())) {
            err += "<li>Password should contain at least one uppercase letter.</li>";
        }
        if (!/[!@#$%^&*]/.test(pass.val())) {
            err += "<li>Password must have at lease one special character ('!', '@', '#', '$', '%', '&', '*' or '^').</li>";
        }
        pass.addClass("is-invalid");
        passFb.addClass('invalid-feedback').html(err);
        result = false;
    } else {
        pass.addClass("is-valid");
        passFb.addClass('valid-feedback').html("Looks Good!");
    }
    if (confirmPass.val() === pass.val()) {
        confirmPass.addClass("is-valid");
        confirmPassFb.addClass('valid-feedback').html("Looks Good!");
    } else {
        confirmPass.addClass("is-invalid");
        confirmPassFb.addClass('invalid-feedback').html("It does not match the password.");
        result = false;
    }
    return result;
}

function imgValidation(file, fb) {
    var files = file[0].files;
    if (files.length < 1) return true;
    const validExt = ['png', 'jpg', 'gif'];
    var result = true;
    var err = "";
    var pcs = file.val().split('.');
    if (pcs.length < 2 || !validExt.includes(pcs[pcs.length - 1])) {
        err += "<li>Please choose a valid file with '.png', '.jpg' or '.gif' extensions.</li>";
        result = false;
    }
    if (files[0].size > 2 * 1024 * 1024) {
        err += "<li>File size limit is 2MB.</li>";
        result = false;
    }
    if (!result) {
        file.addClass('is-invalid');
        fb.addClass('invalid-feedback').html(err);
        return false;
    } else {
        file.addClass('is-valid');
        fb.addClass('valid-feedback').html('Looks Good!');
        return true;
    }
}

// originals
function registerValidation(e) {
    const email = $('#email');
    const username = $('#username');
    const firstName = $('#first-name');
    const lastName = $('#last-name');
    const pass = $('#password');
    const confirmPass = $('#confirm-password');
    const hobbies = $('.form-check-input');

    var result = true;

    // email
    result = result && emailValidation(email, $('#email-fb'));

    // username
    if (!username.val().match(/^[a-zA-Z0-9_@!]{5,20}$/)) {
        var err = "";
        if (username.val().length < 5 && username.val().length > 20) {
            err += "It should be between 5 and 20 characters.";
        } else {
            err += "It should not contain any special characters except '@', '_' and '!'";
        }
        username.addClass("is-invalid");
        $('#username-fb').addClass('invalid-feedback').html(err);
        result = false;
    } else {
        username.addClass("is-valid");
        $('#username-fb').addClass('valid-feedback').html("Looks Good!");
    }

    // first name and last name
    result = nameValidation(firstName, $('#firstname-fb'), 1, 50) && result;
    result = nameValidation(lastName, $('#lastname-fb'), 1, 25) && result;

    // password and confirm password
    result = passwordValidation(pass, $('#password-fb'), confirmPass, $('#confirm-password-fb')) && result;

    // hobbies
    var hobbyChecked = [];
    for (var i = 0; i < hobbies.length; i++) {
        hobbyChecked.push(hobbies[i].checked);
    }
    if (!hobbyChecked.includes(true)) {
        $('#hobby-error').addClass("invalid-feedback mb-3").html("Please select at least one hobby. Or choose 'other' and enter interests.");
        $('#hobby-block').addClass("is-invalid");
        result = false;
    } else {
        if (hobbyChecked[hobbyChecked.length - 1]) {
            if (!$('#other-hobbies').val().trim().match(/^[a-zA-Z,-\s]+$/)) {
                $('#other-hobbies-fb').addClass("invalid-feedback mb-3").html("Please enter your other hobbies separated by comma (should not include numbers or any special characters except ',' and '-').");
                $('#other-hobbies').addClass("is-invalid");
                result = false;
            } else {
                $('#other-hobbies-fb').addClass("valid-feedback mb-3").html("Looks Good!");
                $('#other-hobbies').addClass("is-valid");
                $('#other').val($('#other-hobbies').val());
            }
        } else {
            $('#hobby-error').addClass("valid-feedback mb-3").html("Looks Good!");
            $('#hobby-block').addClass("is-valid");
        }
    }

    return result;
}

function loginValidation(e) {
    const id = $('#email');
    const pass = $('#password');

    var result = true;

    // email
    if (id.val().trim() === "") {
        id.addClass("is-invalid");
        $('#email-fb').addClass('invalid-feedback').html("Email / username cannot be empty.");
        result = false;
    } else {
        id.addClass("is-valid");
        $('#email-fb').addClass('valid-feedback').html("Looks Good!");
    }

    // password
    if (pass.val().trim() === "") {
        pass.addClass("is-invalid");
        $('#password-fb').addClass('invalid-feedback').html("Password cannot be empty.");
        result = false;
    } else {
        pass.addClass("is-valid");
        $('#password-fb').addClass('valid-feedback').html("Looks Good!");
    }

    return result;
}

function forgotPassValidation(e) {
    return emailValidation($('#email'), $('#email-fb'));
}

function updateValidation(e) {
    const firstName = $('#first-name');
    const lastName = $('#last-name');
    const pass = $('#password');
    const confirmPass = $('#confirm-password');
    const img = $('#profile-pic');
    var result = true;

    // first name and last name
    result = nameValidation(firstName, $('#firstname-fb'), 1, 50) && result;
    result = nameValidation(lastName, $('#lastname-fb'), 1, 25) && result;

    // password and confirm password
    result = passwordValidation(pass, $('#password-fb'), confirmPass, $('#confirm-password-fb')) && result;

    // profile pic
    result = imgValidation(img, $('#profile-pic-fb'))

    return result;
}

function groupValidation(e) {
    const name = $('#name');
    const img = $('#group-pic');
    var result = true;

    // name
    result = nameValidation(name, $('#name-fb'), 2, 40) && result;

    // image
    result = imgValidation(img, $('group-pic-fb')) && result;

    return result;
}

function eventValidation(e) {
    const date = $('#date');
    const time = $('#time');
    var result = true;

    // name
    result = nameValidation($('#name'), $('#name-fb'), 2, 60) && result;

    // image
    result = imgValidation($('#event-pic'), $('event-pic-fb')) && result;

    // time
    if (time.val() == '') {
        time.addClass("is-invalid");
        $('#time-fb').addClass('invalid-feedback').html("Time is invalid.");
        result = false;
    } else {
        time.addClass("is-valid");
        $('#time-fb').addClass('valid-feedback').html("Looks Good!");
    }

    return result;
}