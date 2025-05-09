using FlightBooking.Models;

namespace FlightBooking.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task AddUserAsync(User user);
        Task<User?> GetByIdAsync(int id);
    }
}
