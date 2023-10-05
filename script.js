// Author: Muhammad Ahmad
// Website: https://ahmad-junior.github.io/me-portfolio
// Date: 05-Oct-2023
// Description: This is a password generator and checker app. It generates password according to the user and also checks the user provided password.

// Password check elements
const passBox = document.getElementById("passBox"),
    showPassCheck = document.getElementById("showPassCheck"),
    checkPasswordBtn = document.getElementById("checkPasswordBtn");

// Suggested password elements
const rEasy = document.getElementById("rEasy"),
    rMed = document.getElementById("rMed"),
    rStrong = document.getElementById("rStrong"),
    lenSP = document.getElementById("lenSP");

const suggestedPasswordBox = document.getElementById("suggestedPasswordBox"),
    suggestedPasswordInput = document.getElementById("suggestedPasswordInput"),
    copyBtn = document.getElementById("copyBtn"),
    suggestBtn = document.getElementById("suggestBtn"),
    checkSuggestedPass = document.getElementById("checkSuggestedPass");

// Result password elements
const resultPasswordBox = document.getElementById("resultPasswordBox"),
    resultPasswordLength = document.getElementById("resultPasswordLength"),
    resultPasswordUpper = document.getElementById("resultPasswordUpper"),
    resultPasswordLower = document.getElementById("resultPasswordLower"),
    resultPasswordNumber = document.getElementById("resultPasswordNumber"),
    resultPasswordSymbol = document.getElementById("resultPasswordSymbol"),
    resultSrength = document.getElementById("resultSrength");


// Enable Input According to the User!
const enableLenSP = () => {
    // Enable input
    if (rEasy.checked || rMed.checked || rStrong.checked) {
        lenSP.removeAttribute("disabled");
    } else {
        inputField.setAttribute("disabled", true);
    }

    // Set Min and Max
    let minPasswordLength, maxPasswordLength;

    if (rEasy.checked) {
        minPasswordLength = 6;
        maxPasswordLength = 8;
    } else if (rMed.checked) {
        minPasswordLength = 8;
        maxPasswordLength = 12;
    } else if (rStrong.checked) {
        minPasswordLength = 12;
        maxPasswordLength = 20;
    } else {
        minPasswordLength = 0;
        maxPasswordLength = 0;
    }

    lenSP.setAttribute("min", minPasswordLength);
    lenSP.setAttribute("max", maxPasswordLength);

    // Hide Suggested Password Box
    suggestedPasswordBox.classList.remove("visible");
}

// Enable Suggest Button
const enableSuggestButton = () => {
    if (lenSP.validity.valid) {
        suggestBtn.removeAttribute("disabled");
    } else {
        suggestBtn.setAttribute("disabled", true);
    }
}

// Generate Password!
const generatePassword = (len, pType) => {
    //Character sets
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Generate Password according to the user, provided len and choice
    let password = '';

    if (pType === 'weak') {
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
            password += lowercaseLetters[randomIndex];
        }
    } else if (pType === 'easy') {
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
            Math.random() < 0.5 ? password += uppercaseLetters[randomIndex] : password += lowercaseLetters[randomIndex];
        }
    } else if (pType === 'medium') {
        for (let i = 0; i < len; i++) {
            const random = Math.random();
            const randomIndex = random < 0.33 ? Math.floor(Math.random() * uppercaseLetters.length) : random < 0.66 ? Math.floor(Math.random() * lowercaseLetters.length) : Math.floor(Math.random() * digits.length);

            password += random < 0.33 ? uppercaseLetters[randomIndex] : random < 0.66 ? lowercaseLetters[randomIndex] : digits[randomIndex];
        }
    } else if (pType === 'strong') {
        for (let i = 0; i < len; i++) {
            const random = Math.random();
            const randomIndex = random < 0.25 ? Math.floor(Math.random() * uppercaseLetters.length) : random < 0.5 ? Math.floor(Math.random() * lowercaseLetters.length) : random < 0.75 ? Math.floor(Math.random() * digits.length) : Math.floor(Math.random() * specialCharacters.length);

            password += random < 0.25 ? uppercaseLetters[randomIndex] : random < 0.5 ? lowercaseLetters[randomIndex] : random < 0.75 ? digits[randomIndex] : specialCharacters[randomIndex];
        }
    }
    else {
        password = 'Please select a password type';
    }

    // Return password
    return password;
}

// Copy Password to Clipboard
const copyPassword = () => {
    // Get password
    const password = suggestedPasswordInput.innerHTML;

    // Copy password to clipboard
    navigator.clipboard.writeText(password);

    // Show copied message
    const copiedMsg = document.getElementById("copyAlert");
    copiedMsg.classList.add("visible");
    copyBtn.setAttribute("disabled", true);
    copyBtn.innerHTML = "Copied!";

    // Hide copied message after 3 seconds
    setTimeout(() => {
        copiedMsg.classList.remove("visible");
        copyBtn.removeAttribute("disabled");
        copyBtn.innerHTML = "Copy";
    }, 2000);
}

// Check user provided password
const checkPassword = (password) => {
    // Patterns
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitsPattern = /[0-9]/;
    const specialCharactersPattern = /[!@#$%^&*()_+\-=[]/;

    // Flag variables
    let containsUppercase = false;
    let containsLowercase = false;
    let containsDigits = false;
    let containsSpecialCharacters = false;

    // Flag countings
    let uppercaseCount = 0;
    let lowercaseCount = 0;
    let digitsCount = 0;
    let specialCharactersCount = 0;

    // Test for patterns
    for (let i = 0; i < password.length; i++) {
        if (uppercasePattern.test(password[i])) {
            containsUppercase = true;
            uppercaseCount++;
        } else if (lowercasePattern.test(password[i])) {
            containsLowercase = true;
            lowercaseCount++;
        } else if (digitsPattern.test(password[i])) {
            containsDigits = true;
            digitsCount++;
        } else if (specialCharactersPattern.test(password[i])) {
            containsSpecialCharacters = true;
            specialCharactersCount++;
        }
    }

    // Set all ohter character to special characters
    specialCharactersCount = password.length - uppercaseCount - lowercaseCount - digitsCount;

    // Check for password strength
    let passwordStrength = '';

    if (containsUppercase && containsLowercase && containsDigits && containsSpecialCharacters) {
        if (password.length >= 12) {
            passwordStrength = 'strong';
        } else {
            passwordStrength = 'medium';
        }
    } else if (containsUppercase && containsLowercase && containsDigits) {
        if (password.length >= 8) {
            passwordStrength = 'medium';
        } else {
            passwordStrength = 'weak';
        }
    } else if (containsLowercase && containsDigits) {
        if (password.length >= 6) {
            passwordStrength = 'easy';
        } else {
            passwordStrength = 'weak';
        }
    } else {
        passwordStrength = 'weak';
    }

    // Return password details as object
    const passwordDetails = {
        password: password,
        passwordStrength: passwordStrength,
        uppercaseCount: uppercaseCount,
        lowercaseCount: lowercaseCount,
        digitsCount: digitsCount,
        specialCharactersCount: specialCharactersCount
    }

    return passwordDetails;
}

// Enable Suggest Button and fill the suggested password box
const suggestPassword = () => {
    // Get password length
    const len = lenSP.value;

    // Get password type
    let pType = '';

    if (rEasy.checked) {
        pType = 'easy';
    } else if (rMed.checked) {
        pType = 'medium';
    } else if (rStrong.checked) {
        pType = 'strong';
    } else {
        pType = 'weak';
    }

    // Generate password
    let password = generatePassword(len, pType);

    return password;
}

// Result Password 
const resultPassword = (password) => {
    // Check password strength
    const passwordDetails = checkPassword(password);

    // Fill password details
    resultPasswordLength.innerHTML = password.length;
    resultPasswordUpper.innerHTML = passwordDetails.uppercaseCount;
    resultPasswordLower.innerHTML = passwordDetails.lowercaseCount;
    resultPasswordNumber.innerHTML = passwordDetails.digitsCount;
    resultPasswordSymbol.innerHTML = passwordDetails.specialCharactersCount;

    // Set password strength
    if (passwordDetails.passwordStrength === 'weak') {
        resultSrength.innerHTML = 'Weak Password';
        resultSrength.classList.remove("bg-warning-subtle", "text-warning", "bg-info-subtle", "text-info", "bg-success-subtle", "text-success");
        resultSrength.classList.add("bg-danger-subtle", "text-danger");
    } else if (passwordDetails.passwordStrength === 'easy') {
        resultSrength.innerHTML = 'Easy Password';
        resultSrength.classList.remove("bg-danger-subtle", "text-danger", "bg-info-subtle", "text-info", "bg-success-subtle", "text-success");
        resultSrength.classList.add("bg-warning-subtle", "text-warning");
    } else if (passwordDetails.passwordStrength === 'medium') {
        resultSrength.innerHTML = 'Medium Password';
        resultSrength.classList.add("bg-info-subtle", "text-info");
    } else if (passwordDetails.passwordStrength === 'strong') {
        resultSrength.innerHTML = 'Strong Password';
        resultSrength.classList.remove("bg-warning-subtle", "text-warning", "bg-info-subtle", "text-info", "bg-danger-subtle", "text-danger");
        resultSrength.classList.add("bg-success-subtle", "text-success");
    } else {
        resultSrength.innerHTML = 'Invalid Password';
        resultSrength.classList.remove("bg-warning-subtle", "text-warning", "bg-info-subtle", "text-info", "bg-success-subtle", "text-success");
        resultSrength.classList.add("bg-danger-subtle", "text-danger");
    }

    // Show password details
    resultPasswordBox.classList.add("visible");
}

// Events
rEasy.addEventListener("change", () => {
    enableLenSP();
})

rMed.addEventListener("change", () => {
    enableLenSP();
})

rStrong.addEventListener("change", () => {
    enableLenSP();
})

lenSP.addEventListener("input", () => {
    enableSuggestButton();
})

suggestBtn.addEventListener("click", () => {
    // Show Suggested Password Box
    suggestedPasswordBox.classList.add("visible");


    // User Credentials
    const len = lenSP.value;
    const pType = rEasy.checked ? 'easy' : rMed.checked ? 'medium' : rStrong.checked ? 'strong' : 'weak';

    // Promise to generate password until according to the user
    const proPass = new Promise((resolve, reject) => {
        // Generate password
        let password = suggestPassword();

        // Check password strength
        let passwordStrength = checkPassword(password);
        let passwordLen = password.length;

        // Check if password is according to the user
        if (passwordStrength === pType && passwordLen === len) {
            resolve(password);
        } else {
            reject(password);
        }
    });


    // Resolve promise
    proPass.then((password) => {
        suggestedPasswordInput.innerHTML = password;
    }).catch((password) => {
        suggestedPasswordInput.innerHTML = password;
    })

    // Empty the credentials
    lenSP.value = '';
    rEasy.checked = false;
    rMed.checked = false;
    rStrong.checked = false;
    suggestBtn.setAttribute("disabled", true);
    lenSP.setAttribute("disabled", true);
})

copyBtn.addEventListener("click", () => {
    copyPassword();
})

checkSuggestedPass.addEventListener("click", () => {
    // Get user provided password
    const password = suggestedPasswordInput.innerHTML;

    resultPassword(password);
})



showPassCheck.addEventListener("change", () => {
    if (showPassCheck.checked) {
        passBox.setAttribute("type", "text");
    } else {
        passBox.setAttribute("type", "password");
    }
})

checkPasswordBtn.addEventListener("click", () => {
    // Get user provided password
    const password = passBox.value;

    resultPassword(password);
})

// End of file