// Fetching the index.txt file from the hosted GitHub URL
fetch('https://raw.githubusercontent.com/GoombaStudios/cs-skin-mgr/refs/heads/main/index.txt')
    .then(response => response.text())
    .then(data => {
        const commands = parseCommands(data);
        displayCommands(commands);
    })
    .catch(error => console.error('Error fetching the index.txt file:', error));

// Parse the commands from index.txt file format
function parseCommands(data) {
    const commands = [];
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        const knifeName = lines[i].trim();
        const command = lines[++i].trim();
        commands.push({ knifeName, command });
    }
    return commands;
}

// Display commands in the command-list
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

// Handle copy command
function copyCommand(command, button) {
    navigator.clipboard.writeText(command)
        .then(() => {
            // Add animation class to the button
            button.classList.add('copied');
            setTimeout(() => {
                button.classList.remove('copied');
            }, 1000);
        })
        .catch(err => console.error('Error copying text: ', err));
}

// Search functionality
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
