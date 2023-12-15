export async function fetchRestaurants(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        return [];
    }
}

export async function fetchMenu(restaurantName) {
    try {
        const response = await fetch('../data/menus.json');

        if (!response.ok) {
            throw new Error(`Failed to fetch menu data. Status: ${response.status}`);
        }

        const menuData = await response.json();

        // Find the menu for the specified restaurant
        const restaurantMenu = menuData.find(item => item.restaurantName === restaurantName);

        if (restaurantMenu) {
            return restaurantMenu.menu;
        } else {
            console.error(`Menu not found for ${restaurantName}`);
            return [];
        }
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return [];
    }
}

