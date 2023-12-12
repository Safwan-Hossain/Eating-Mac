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

    const openingTimesP = document.createElement('p');
    openingTimesP.className = 'opening-times';
    openingTimesP.innerHTML = `<i class="fa-solid fa-clock"></i> Open Until ${data.openUntil}`;
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

export function renderRestaurants(restaurants, containerSelector) {
    const container = document.querySelector(containerSelector);
    restaurants.forEach(restaurant => {
        container.appendChild(createRestaurantElement(restaurant));
    });
}

const dieteryOptionsMap = {
    "vegan": 'fa-solid fa-v',
    "halal": 'fa-solid fa-square-h',
    "vegetarian": 'fa-solid fa-leaf',
    "kosher": 'fa-brands fa-kickstarter',
}