using ASDesktopUI.Library.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ASDesktopUI.Library.Api
{
    public interface IUserEndpoint
    {
        Task<List<UserModel>> GetAll();
    }
}