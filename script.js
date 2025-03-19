document.addEventListener("DOMContentLoaded", function() {
    const commandList = document.getElementById("command-list");

    function loadCommands() {
        commands.forEach(item => {
            const commandItem = document.createElement("div");
            commandItem.classList.add("command-item");

            // Command Name
            const name = document.createElement("span");
            name.textContent = item.knifeName;

            // Copy Button
            const button = document.createElement("button");
            button.classList.add("copy-button");
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            button.onclick = () => copyCommand(button, item.command);

            // Append elements
            commandItem.appendChild(name);
            commandItem.appendChild(button);
            commandList.appendChild(commandItem);
        });
    }

    function copyCommand(button, command) {
        navigator.clipboard.writeText(command).then(() => {
            button.classList.add("copied");
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                button.classList.remove("copied");
                button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 1000);
        });
    }

    function filterCommands() {
        const searchValue = document.getElementById("search").value.toLowerCase();
        document.querySelectorAll(".command-item").forEach(item => {
            const name = item.querySelector("span").textContent.toLowerCase();
            item.style.display = name.includes(searchValue) ? "flex" : "none";
        });
    }

    loadCommands();
});
