(function() {
    var formSubmitButton = document.getElementById('form-submit');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var messageInput = document.getElementById('message');

    formSubmitButton.addEventListener('click', captureFeedback);

    function captureFeedback() {
        var name = nameInput.value;
        var email = emailInput.value;
        var message = messageInput.value;

        var nameValid = validateName(name);
        var emailValid = validateEmail(email);
        var messageValid = validateMessage(message);

        if (nameValid && emailValid && messageValid) {
            logFeedback(name, email, message);
        } else {
            var submissionError = "";

            if (!nameValid) {
                submissionError += "Please enter a valid name\n";
            }

            if (!emailValid) {
                submissionError += "Please enter a valid email\n";
            }

            if (!messageValid) {
                submissionError += "Please enter a valid message\n";
            }

            alert(submissionError);
        }
    }

    function logFeedback(name, email, message) {
        var url = 'https://timpani.bibek.io/timpani/standard/sales/feedback';
        var method = 'POST';

        var xhr = createHTTPRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify({
            name: name,
            emailAddress: email,
            message: message
        }));

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    clearForm();
                } else {
                    alert('Form submission failed! Error: ' + xhr.status + ' ' + xhr.statusText);
                }
            }
        }
    }

    function clearForm() {
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }

    function createHTTPRequest() {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    }

    function validateEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateName(name) {
        return name.length > 0;
    }

    function validateMessage(message) {
        return message.length > 0;
    }

})();
