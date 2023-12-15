function createRestaurantElement(data) {
    const button = document.createElement('button');
    button.className = 'restaurant-button';

    const img = document.createElement('img');
    img.src = data.imageSrc;
    img.alt = data.name;
    button.appendChild(img);

    const titleArea = document.createElement('div');
    titleArea.className = 'title-area';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'restaurant-name';
    nameSpan.textContent = data.name;
    titleArea.appendChild(nameSpan);

    const locationSpan = document.createElement('span');
    locationSpan.textContent = data.location;
    titleArea.appendChild(locationSpan);

    const reviewStars = document.createElement('div');
    reviewStars.className = 'review-stars';
    reviewStars.textContent = data.rating;
    titleArea.appendChild(reviewStars);

    button.appendChild(titleArea);

    const infoPanel = document.createElement('div');
    infoPanel.className = 'info-panel';

    const openingTime = data.openingTime;
    const closingTime = data.closingTime;
    const isRestaurantOpen = isTimeInRange(openingTime, closingTime);

    const openingTimesP = document.createElement('p');
    openingTimesP.className = 'opening-times';

    if (isRestaurantOpen) {
        openingTimesP.innerHTML = `<i class="fa-solid fa-clock"></i> Open Until ${data.closingTime}`;
    }
    else {
        openingTimesP.innerHTML = `<i class="fa-solid fa-clock"></i> Closed | Opens at ${data.openingTime}`;
    }

    infoPanel.appendChild(openingTimesP);

    const minimumPurchaseP = document.createElement('p');
    minimumPurchaseP.className = 'minimum-purchase';
    minimumPurchaseP.innerHTML = `<i class="fa-solid fa-sack-dollar"></i> Minimum Purchase: $${data.minimumPurchase}`;
    infoPanel.appendChild(minimumPurchaseP);

    const dietaryOptionsP = document.createElement('p');
    dietaryOptionsP.className = 'dietary-options';
    dietaryOptionsP.textContent = 'Dietary Options: ';
    data.dietaryOptions.forEach(option => {
        const className = dieteryOptionsMap[option.toLowerCase()]
        const icon = document.createElement('i');
        icon.className = className;
        icon.title = option ;
        icon.style.marginLeft = '3px'; 
        dietaryOptionsP.appendChild(icon);
    });
    infoPanel.appendChild(dietaryOptionsP);

    const distanceP = document.createElement('p');
    distanceP.className = 'distance';
    distanceP.innerHTML = `<i class="fa-solid fa-map-pin"></i> ${data.distance}km`;
    infoPanel.appendChild(distanceP);

    button.appendChild(infoPanel);

    return button;

}

function createLinkedRestaurantElement(data) {
    // Create a link to the restaurant detail page
    const restaurantLink = document.createElement('a');
    restaurantLink.href = `restaurant-detail.html?restaurant=${encodeURIComponent(data.name)}`;
    restaurantLink.appendChild(createRestaurantElement(data));

    return restaurantLink;
}

export function renderRestaurants(restaurants, containerSelector) {
    const container = document.querySelector(containerSelector);
    restaurants.forEach(restaurant => {
        container.appendChild(createLinkedRestaurantElement(restaurant));
    });
}

const dieteryOptionsMap = {
    "vegan": 'fa-solid fa-v',
    "halal": 'fa-solid fa-square-h',
    "vegetarian": 'fa-solid fa-leaf',
    "kosher": 'fa-brands fa-kickstarter',
}

function getCurrentTimeFormatted() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function isTimeInRange(startTimeStr, endTimeStr) {
    function timeStringToDate(timeStr) {
        timeStr = convertTo24Hour(timeStr);
        const [hours, minutes] = timeStr.split(':').map(Number);
        const time = new Date();
        time.setHours(hours, minutes, 0, 0);
        return time;
    }
    const currentTimeStr = getCurrentTimeFormatted();
    const currentTime = currentTimeStr ? timeStringToDate(currentTimeStr) : new Date();
    let startTime = timeStringToDate(startTimeStr);
    let endTime = timeStringToDate(endTimeStr);

    if (endTime <= startTime) {
        endTime.setDate(endTime.getDate() + 1); 

        if (currentTime < startTime) {
            currentTime.setDate(currentTime.getDate() - 1);
        }
    }

    return currentTime >= startTime && currentTime <= endTime;
}

function convertTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    // Correcting the hours if it's 12 AM or PM
    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}