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
