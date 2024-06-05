using bcaAPI.Models;
using bcaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net;

namespace bcaAPI.Services
{
    public class GoogleMapService : IGoogleMapService
    {
        private readonly HttpClient _httpClient;
        private readonly string _googleMapsApiKey;
        public GoogleMapService(HttpClient httpClient, IConfiguration configuration) {
            _httpClient = httpClient;
            _googleMapsApiKey = configuration["GoogleMapsSettings:ApiKey"];        
    }
        public async Task <Coordinates> GetCoordinatesAsync (string place)
        {
            var requestUri = $"https://maps.googleapis.com/maps/api/place/textsearch/json?query={Uri.EscapeDataString(place)}&key={_googleMapsApiKey}";
            var response = await _httpClient.GetAsync (requestUri);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception("Error fetching data from Google Maps API.");
            }
            var content = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(content);

            var location = json["results"]?[0]?["geometry"]?["location"];
            if(location == null)
            {
                throw new Exception("Location was not found in Google Maps API response.");
            }


            return new Coordinates {
            lat = (double)location["lat"],
            lng = (double)location["lng"],
            };
        }
    }
}
