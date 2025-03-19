// Display commands loaded from list.js
function displayCommands(commands) {
    const commandList = document.getElementById('command-list');
    commands.forEach(command => {
        const commandItem = document.createElement('div');
        commandItem.classList.add('command-item');

        const knifeName = document.createElement('span');
        knifeName.textContent = command.knifeName;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Copy Command';
        copyButton.onclick = () => copyCommand(command.command, copyButton);

        commandItem.appendChild(knifeName);
        commandItem.appendChild(copyButton);
        commandList.appendChild(commandItem);
    });
}

// Handle copy command with animation
function copyCommand(command, button) {
    navigator.clipboard.writeText(command)
        .then(() => {
            button.classList.add('copied');
            setTimeout(() => {
                button.classList.remove('copied');
            }, 1000);
        })
        .catch(err => console.error('Error copying text: ', err));
}

// Filter the commands based on the search input
function filterCommands() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const commandItems = document.querySelectorAll('.command-item');

    commandItems.forEach(item => {
        const knifeName = item.querySelector('span').textContent.toLowerCase();
        if (knifeName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// When the page loads, display the commands from the list.js
window.onload = function() {
    displayCommands(commands); // Use the commands from list.js
};
