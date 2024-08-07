document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskTableBody = document.getElementById('taskTableBody');
    const taskInput = document.getElementById('taskInput');
    const taskDescriptionInput = document.getElementById('taskDescriptionInput');
    const teamMemberInput = document.getElementById('teamMemberInput');
    const taskStatusSelect = document.getElementById('taskStatus');
    const deadlineInput = document.getElementById('deadlineInput');
    const editIndexInput = document.getElementById('editIndex');
    const modalTitle = document.getElementById('modalTitle');

    let editingIndex = null;

    // Open modal for adding a new task
    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        modalTitle.textContent = 'Add New Task';
        editIndexInput.value = ''; // Clear the edit index
        editingIndex = null; // Reset editing index
        clearModalInputs(); // Clear input fields
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Save or update task
    saveTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
        const teamMember = teamMemberInput.value.trim();
        const taskStatus = taskStatusSelect.value;
        const deadline = deadlineInput.value;

        // Ensure all fields are filled
        if (taskName && taskDescription && teamMember && deadline) {
            if (editingIndex !== null) {
                // Update existing task
                const row = taskTableBody.children[editingIndex];
                row.children[0].textContent = taskName;
                row.children[1].textContent = taskDescription;
                row.children[2].textContent = teamMember;
                row.children[3].textContent = taskStatus;
                row.children[4].textContent = deadline;
                row.querySelector('.editBtn').textContent = 'Edit';
            } else {
                // Add new task
                const row = document.createElement('tr');

                const taskNameCell = document.createElement('td');
                taskNameCell.textContent = taskName;
                row.appendChild(taskNameCell);

                const taskDescriptionCell = document.createElement('td');
                taskDescriptionCell.textContent = taskDescription;
                row.appendChild(taskDescriptionCell);

                const teamMemberCell = document.createElement('td');
                teamMemberCell.textContent = teamMember;
                row.appendChild(teamMemberCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = taskStatus;
                row.appendChild(statusCell);

                const deadlineCell = document.createElement('td');
                deadlineCell.textContent = deadline;
                row.appendChild(deadlineCell);

                const actionsCell = document.createElement('td');
                const editBtn = document.createElement('button');
                editBtn.textContent = "Edit";
                editBtn.className = 'editBtn';
                editBtn.addEventListener('click', () => {
                    editingIndex = Array.from(taskTableBody.children).indexOf(row);
                    populateModalForEdit(row);
                    modal.style.display = 'block';
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = "Delete";
                deleteBtn.className = 'deleteBtn';
                deleteBtn.addEventListener('click', () => {
                    taskTableBody.removeChild(row);
                });

                actionsCell.appendChild(editBtn);
                actionsCell.appendChild(deleteBtn);
                row.appendChild(actionsCell);

                taskTableBody.appendChild(row);
            }

            // Clear input fields and close modal
            clearModalInputs();
            modal.style.display = 'none';
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Function to clear modal input fields
    function clearModalInputs() {
        taskInput.value = '';
        taskDescriptionInput.value = '';
        teamMemberInput.value = '';
        taskStatusSelect.selectedIndex = 0;
        deadlineInput.value = '';
    }

    // Function to populate modal for editing an existing task
    function populateModalForEdit(row) {
        taskInput.value = row.children[0].textContent;
        taskDescriptionInput.value = row.children[1].textContent;
        teamMemberInput.value = row.children[2].textContent;
        taskStatusSelect.value = row.children[3].textContent;
        deadlineInput.value = row.children[4].textContent;
        modalTitle.textContent = 'Edit Task';
    }
});
