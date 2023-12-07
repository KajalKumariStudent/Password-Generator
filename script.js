document.addEventListener("DOMContentLoaded", function () {
    const generated_password = document.querySelector("#textin");
    const lengthSlider = document.querySelector('#slider');
    const passIndicator = document.querySelector(".pass-indicator");
    const copyIcon = document.querySelector(".copypass");

    const characters = {
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "0123456789",
        symbols: "^!$%&|[](){}:;.,*+-#@<>~"
    };

    const checkboxes = document.querySelectorAll(".option input");

    const generatePassword = () => {
        let staticPassword = "";
        let randomPassword = "";
        let excludeDuplicate = false;
        let passLength = lengthSlider.value;

        checkboxes.forEach(option => {
            if(option.checked) {
                
                if(option.id !== "Exc-Duplicates" && option.id !== "In-Spaces"){
                    //adding particular key value from character object to staticPassword
                    staticPassword += characters[option.id];
                } 
                else if(option.id === "In-Spaces"){ //if checkbox id is spaces
                   staticPassword += ""; //adding space at the beginning & end of staticPassword
                }
                else{ //else pass true value to excludeDuplicate
                   excludeDuplicate = true;
                
                }
            }
        });

        for (let i = 0; i < passLength; i++) {
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            if (excludeDuplicate) {
                if (!randomPassword.includes(randomChar) || randomChar === " ") {
                    randomPassword += randomChar;
                } else {
                    i--;
                }
            } else {
                randomPassword += randomChar;
            }
        }
        generated_password.value = randomPassword;
    };

    
    const updatePassIndicator = () => {
        passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
    };

    const updateSlider = () => {
        document.getElementById('sliderValue').innerText=lengthSlider.value;
        generatePassword(); 
        updatePassIndicator();
        
       
    };
// copying the password generated
    const copyToClipboard = () => {
        navigator.clipboard.writeText(generated_password.value);
        copyIcon.innerText = "check";
        setTimeout(() => {
            copyIcon.innerText = "copy_all";
        }, 1500);
    };

    copyIcon.addEventListener("click", copyToClipboard);
    lengthSlider.addEventListener("input", updateSlider);
    document.querySelector('.button').addEventListener("click", generatePassword);

    updateSlider();
});
