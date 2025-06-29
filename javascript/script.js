document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const passwordOutput = document.getElementById('password-output');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const lengthSlider = document.getElementById('password-length');
    const lengthValue = document.getElementById('length-value');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const strengthText2 = document.getElementById('strength-text-2');
            
    // Toggle switches
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
            
    // Character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
    // Update length value display
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
        if (isAtLeastOneOptionChecked()) {
            generatePassword();
        }
    });
            
    // Check if at least one option is checked
    function isAtLeastOneOptionChecked() {
        return uppercaseCheckbox.checked || 
                lowercaseCheckbox.checked || 
                numbersCheckbox.checked || 
                symbolsCheckbox.checked;
    }
            
    // Generate password function
    function generatePassword() {
        let chars = '';
        let password = '';
                
        // Build character set based on selected options
        if (uppercaseCheckbox.checked) chars += uppercaseChars;
        if (lowercaseCheckbox.checked) chars += lowercaseChars;
        if (numbersCheckbox.checked) chars += numberChars;
        if (symbolsCheckbox.checked) chars += symbolChars;
                
        // Ensure at least one character from each selected set is included
        if (chars.length === 0) {
            passwordOutput.value = 'Select at least one option';
            updatePasswordStrength('');
            return;
        }
                
        const length = parseInt(lengthSlider.value);
                
        // First, add at least one character from each selected character set
        if (uppercaseCheckbox.checked) {
            password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
        }
        if (lowercaseCheckbox.checked) {
            password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
        }
        if (numbersCheckbox.checked) {
            password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
        }
        if (symbolsCheckbox.checked) {
            password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
        }
                
        // Fill the rest with random characters
        for (let i = password.length; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
                
        // Shuffle the password to mix the mandatory characters
        password = shuffleString(password);
                
        passwordOutput.value = password;
        updatePasswordStrength(password);
    }
            
    // Shuffle string function
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }
            
    // Update password strength indicator
    function updatePasswordStrength(password) {
        if (!password || password === 'Select at least one option') {
            strengthBar.className = 'password-meter w-full bg-gray-300';
            strengthText.textContent = 'NONE';
            strengthText2.textContent = 'NONE';
            strengthText.className = 'text-sm font-bold text-gray-500';
            return;
        }
                
        let strength = 0;
        const length = password.length;
                
        // Length contributes to strength
        if (length >= 16) strength += 2;
        else if (length >= 12) strength += 1;
        else if (length >= 8) strength += 0.5;
                
        // Character variety contributes to strength
        let variety = 0;
        if (/[A-Z]/.test(password)) variety++;
        if (/[a-z]/.test(password)) variety++;
        if (/[0-9]/.test(password)) variety++;
        if (/[^A-Za-z0-9]/.test(password)) variety++;
                
        strength += (variety - 1) * 0.5;
                
        // Update UI based on strength
        if (strength >= 3) {
            strengthBar.className = 'password-meter w-full bg-green-500';
            strengthText.textContent = 'STRONG';
            strengthText2.textContent = 'STRONG';
            strengthText.className = 'text-sm font-bold text-green-600';
        } else if (strength >= 1.5) {
            strengthBar.className = 'password-meter w-full bg-yellow-400';
            strengthText.textContent = 'MEDIUM';
            strengthText2.textContent = 'MEDIUM';
            strengthText.className = 'text-sm font-bold text-yellow-600';
        } else {
            strengthBar.className = 'password-meter w-full bg-red-500';
            strengthText.textContent = 'WEAK';
            strengthText2.textContent = 'WEAK';
            strengthText.className = 'text-sm font-bold text-red-600';
        }
    }
            
    // Copy password to clipboard
    copyBtn.addEventListener('click', function() {
        if (!passwordOutput.value || passwordOutput.value === 'Select at least one option') return;
                
        passwordOutput.select();
        document.execCommand('copy');
                
        // Change icon temporarily
        const icon = copyBtn.querySelector('i');
        icon.className = 'fas fa-check';
                
        setTimeout(() => {
            icon.className = 'fas fa-copy';
        }, 2000);
    });
            
    // Generate password when options change
    [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (isAtLeastOneOptionChecked()) {
                generatePassword();
            } else {
                passwordOutput.value = 'Select at least one option';
                updatePasswordStrength('');
            }
        });
    });
            
    // Generate password on button click
    generateBtn.addEventListener('click', generatePassword);
            
    // Generate initial password
    generatePassword();
});
