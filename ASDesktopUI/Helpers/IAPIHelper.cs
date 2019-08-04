using System.Threading.Tasks;
using ASDesktopUI.Models;

namespace ASDesktopUI.Helpers
{
    public interface IAPIHelper
    {
        Task<AuthenticatedUser> Authenticate(string username, string password);
    }
}