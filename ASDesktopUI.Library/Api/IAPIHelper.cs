using ASDesktopUI.Library.Models;
using System.Net.Http;
using System.Threading.Tasks;

namespace ASDesktopUI.Library.Api
{
    public interface IAPIHelper
    {
        HttpClient ApiClient { get; }
        void ResetUserModel();
        Task<AuthenticatedUser> Authenticate(string username, string password);
        Task GetLoggedInUserInfo(string token);
    }       
}