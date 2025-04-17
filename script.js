let attractions = [];
let currentIndex = 0;

// Load XML file using XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/attractions.xml', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
                if (!xhr.responseText || xhr.responseText.trim() === '') {
                    throw new Error('Empty XML response');
                }
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                const parseError = xmlDoc.getElementsByTagName('parsererror');
                if (parseError.length > 0) {
                    throw new Error('XML parsing failed: ' + parseError[0].textContent);
                }
                attractions = Array.from(xmlDoc.getElementsByTagName('Attraction'));
                if (attractions.length === 0) {
                    throw new Error('No attractions found in XML');
                }
                displayAttraction(currentIndex);
                updatePositionIndicator();
            } catch (error) {
                console.error('Error parsing XML:', error);
                document.getElementById('attraction-info').innerHTML = '<p>Error: Could not parse attraction data - ' + error.message + '</p>';
            }
        } else {
            console.error('Failed to load XML file');
            document.getElementById('attraction-info').innerHTML = '<p>Error: Could not load attractions data</p>';
        }
    }
};
// Using static JSON data instead of XML for GitHub Pages compatibility
const attractionsData = {
    "attractions": [
        {
            "name": "Example Attraction",
            "description": "This is a sample attraction"
        }
    ]
};

function loadAttractions() {
    try {
        displayAttractions(attractionsData);
    } catch (error) {
        console.error('Error loading attractions:', error);
        document.getElementById('attraction-info').innerHTML = '<p>Error loading attractions data</p>';
    }
}
xhr.send();

function updatePositionIndicator() {
    const indicator = document.getElementById('position-indicator');
    if (indicator && attractions.length > 0) {
        indicator.textContent = `${currentIndex + 1} of ${attractions.length}`;
    }
}

function getElementTextContent(element, tagName) {
    try {
        const tag = element.getElementsByTagName(tagName)[0];
        return tag ? tag.textContent : 'N/A';
    } catch (error) {
        console.error(`Error getting ${tagName}:`, error);
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
        const cityA = a.getElementsByTagName('City')[0].textContent;
        const cityB = b.getElementsByTagName('City')[0].textContent;
        return cityA.localeCompare(cityB);
    });
    currentIndex = 0;
    displayAttraction(currentIndex);
}

function groupByState() {
    attractions.sort((a, b) => {
        const stateA = a.getElementsByTagName('State')[0].textContent;
        const stateB = b.getElementsByTagName('State')[0].textContent;
        return stateA.localeCompare(stateB);
    });
    currentIndex = 0;
    displayAttraction(currentIndex);
}

function groupByCategory() {
    attractions.sort((a, b) => {
        const categoryA = a.getElementsByTagName('Category')[0].textContent;
        const categoryB = b.getElementsByTagName('Category')[0].textContent;
        return categoryA.localeCompare(categoryB);
    });
    currentIndex = 0;
    displayAttraction(currentIndex);
}
