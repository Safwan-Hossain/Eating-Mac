import { fetchRestaurants } from './modules/data-fetcher.js';
import { renderRestaurants } from './modules/restaurant-renderer.js';

let restaurants = [];
async function init() {
    // restaurants = await fetchRestaurants('../data/restaurants.json');
    // renderRestaurants(restaurants, '.result-list');


    document.getElementById('open-now').addEventListener('change', filterRestaurants);
    document.getElementById('distance-range').addEventListener('input', filterRestaurants);
    document.getElementById('price-range').addEventListener('input', filterRestaurants);
    document.getElementById('dietary').addEventListener('change', filterRestaurants);


    const restaurantButtonsContainer = document.querySelector('.result-list');

    if (restaurantButtonsContainer) {
        restaurantButtonsContainer.addEventListener('click', handleRestaurantButtonClick);
    }
}

document.addEventListener('DOMContentLoaded', init);

function handleRestaurantButtonClick(event) {
    const clickedButton = event.target.closest('.restaurant-button');

    if (clickedButton) {
        // Get the restaurant name from the clicked button or any relevant data
        const restaurantName = clickedButton.querySelector('.restaurant-name').textContent;

        // Redirect to the restaurant detail page with the restaurant name as a query parameter
        window.location.href = `restaurant-detail.html?restaurant=${encodeURIComponent(restaurantName)}`;
    }
}

function filterRestaurants() {
    fetchRestaurants('../data/restaurants.json').then((restaurants) => applyFilters(restaurants));
    
}

function applyFilters(restaurants) {
    const isOpen = document.getElementById('open-now').checked;
    const maxDistance = parseInt(document.getElementById('distance-range').value, 10);
    const maxPrice = parseInt(document.getElementById('price-range').value, 10);
    const dietaryOption = document.getElementById('dietary').value;


    const filteredRestaurants = restaurants.filter(restaurant => {
    
        const isRestaurantOpen = isTimeInRange(restaurant.openingTime, restaurant.closingTime);
        const distanceCheck = restaurant.distance <= maxDistance;
        const priceCheck = restaurant.minimumPurchase <= maxPrice;
        const openCheck = !isOpen || (isOpen && isRestaurantOpen);
        const dietaryCheck = dietaryOption === 'all' || restaurant.dietaryOptions.some(option => option.toLowerCase() === dietaryOption.toLowerCase());

        return distanceCheck && priceCheck && openCheck && dietaryCheck;
    });
    displayRestaurants(filteredRestaurants);
}

function displayRestaurants(filteredRestaurants) {
    const contentArea = document.getElementsByClassName('result-list')[0];
    contentArea.innerHTML = ''; 
    
    renderRestaurants(filteredRestaurants, '.result-list');

    // filteredRestaurants.forEach(restaurant => {
    //     const restaurantElement = createRestaurantElement(restaurant);
    //     contentArea.appendChild(restaurantElement);
    // });
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