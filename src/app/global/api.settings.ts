export class ApiSettings {
    public static BASE_URL = 'https://developers.zomato.com/api/';
    public static VERSION = 'v2.1/';
    public static API_KEY = '751e3606e5384651e4a3c676f304d21b';

    // LOCATION
    public static getGeoCode = ApiSettings.BASE_URL + ApiSettings.VERSION + 'geocode';
    public static getLocationDetail = ApiSettings.BASE_URL + ApiSettings.VERSION + 'location_details';
    public static searchLocation = ApiSettings.BASE_URL + ApiSettings.VERSION + 'locations';

    // RESTAURANT
    public static restaurantList = ApiSettings.BASE_URL + ApiSettings.VERSION + 'search';
    public static restaurantDetails = ApiSettings.BASE_URL + ApiSettings.VERSION + 'restaurant';
}
