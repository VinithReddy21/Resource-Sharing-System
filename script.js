// Function to share a resource
async function shareResource() {
    const resourceInput = document.getElementById("resource");
    const resource = resourceInput.value.trim();
    const shareBtn = document.getElementById("shareBtn");

    if (resource) {
        try {
            // Add loading state to button
            shareBtn.textContent = "Sharing...";
            shareBtn.disabled = true;

            const response = await fetch("http://127.0.0.1:5000/share", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resource }),
            });

            const result = await response.json();
            if (result.message) {
                alert(result.message);
                resourceInput.value = '';
                fetchResources(); // Refresh the list
            } else {
                alert(result.error || "An unknown error occurred.");
            }
        } catch (error) {
            console.error("Error sharing resource:", error);
            alert("Failed to share resource. Check backend connectivity.");
        } finally {
            // Reset button state
            shareBtn.textContent = "Share Resource";
            shareBtn.disabled = false;
        }
    } else {
        alert("Please enter a resource to share.");
    }
}

// Function to fetch and display shared resources
async function fetchResources() {
    try {
        const response = await fetch("http://127.0.0.1:5000/resources");
        const data = await response.json();
        const resourceList = document.getElementById("resourceList");

        // Clear existing list
        resourceList.innerHTML = '';

        // Populate list with resources
        data.resources.forEach((resource, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${resource}`;
            resourceList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching resources:", error);
        alert("Failed to fetch resources. Check backend connectivity.");
    }
}

// Initialize event listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("shareBtn").addEventListener("click", shareResource);
    fetchResources();
});
