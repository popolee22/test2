let attractions = [];
let currentIndex = 0;

// Using static JSON data
const attractionsData = {
    "attractions": [
        {
            "PlaceID": "1",
            "Name": "Example Attraction",
            "City": "Sample City",
            "State": "Sample State",
            "Category": "Sample Category",
            "OpeningHours": "9AM-5PM",
            "Price": "$10",
            "Description": "This is a sample attraction"
        },
        {
            "PlaceID": "2",
            "Name": "Second Attraction",
            "City": "Another City",
            "State": "Another State",
            "Category": "Another Category",
            "OpeningHours": "10AM-6PM",
            "Price": "$15",
            "Description": "This is another sample attraction"
        }
    ]
};

// Load attractions from JSON data
function loadAttractions() {
    try {
        attractions = attractionsData.attractions;
        if (attractions.length === 0) {
            throw new Error('No attractions found in JSON data');
        }
        displayAttraction(currentIndex);
        updatePositionIndicator();
    } catch (error) {
        console.error('Error loading attractions:', error);
        document.getElementById('attraction-info').innerHTML = '<p>Error: Could not load attractions</p>';
    }
}

// Initialize on page load
loadAttractions();

function updatePositionIndicator() {
    const indicator = document.getElementById('position-indicator');
    if (indicator && attractions.length > 0) {
        indicator.textContent = `${currentIndex + 1} of ${attractions.length}`;
    }
}

function getElementTextContent(element, propertyName) {
    try {
        return element[propertyName] || 'N/A';
    } catch (error) {
        console.error(`Error getting ${propertyName}:`, error);
        return 'N/A';
    }
}

function displayAttraction(index) {
    if (attractions.length === 0) {
        console.error("No attractions loaded");
        document.getElementById('attraction-info').innerHTML = '<p>Error: Could not load attractions</p>';
        return;
    }
    
    if (index < 0 || index >= attractions.length) {
        console.error("Invalid attraction index");
        return;
    }

    const attraction = attractions[index];
    const info = document.getElementById('attraction-info');
    info.innerHTML = `
        <p id="place-id" class="attraction-field">Place ID: ${getElementTextContent(attraction, 'PlaceID')}</p>
        <p id="attraction-name" class="attraction-field">Name: ${getElementTextContent(attraction, 'Name')}</p>
        <p id="attraction-city" class="attraction-field">City: ${getElementTextContent(attraction, 'City')}</p>
        <p id="attraction-state" class="attraction-field">State: ${getElementTextContent(attraction, 'State')}</p>
        <p id="attraction-category" class="attraction-field">Category: ${getElementTextContent(attraction, 'Category')}</p>
        <p class="attraction-field">Opening Hours: ${getElementTextContent(attraction, 'OpeningHours')}</p>
        <p class="attraction-field">Price: ${getElementTextContent(attraction, 'Price')}</p>
        <p class="attraction-field">Description: ${getElementTextContent(attraction, 'Description')}</p>
    `;
    updatePositionIndicator();
}

function nextAttraction() {
    currentIndex = (currentIndex + 1) % attractions.length;
    displayAttraction(currentIndex);
}

function prevAttraction() {
    currentIndex = (currentIndex - 1 + attractions.length) % attractions.length;
    displayAttraction(currentIndex);
}

function groupByCity() {
    attractions.sort((a, b) => {
        const cityA = a.City || '';
        const cityB = b.City || '';
        return cityA.localeCompare(cityB);
    });
    currentIndex = 0;
    displayAttraction(currentIndex);
}

function groupByState() {
    attractions.sort((a, b) => {
        const stateA = a.State || '';
        const stateB = b.State || '';
        return stateA.localeCompare(stateB);
    });
    currentIndex = 0;
    displayAttraction(currentIndex);
}

function groupByCategory() {
    attractions.sort((a, b) => {
        const categoryA = a.Category || '';
        const categoryB = b.Category || '';
        return categoryA.localeCompare(categoryB);
    });
    currentIndex = 0;
    displayAttraction(currentIndex);
}
