using bcaAPI.Models;

namespace bcaAPI.Services.Interfaces
{
    public interface IGoogleMapService
    {
        Task <Coordinates> GetCoordinatesAsync(string place);
    }
}
