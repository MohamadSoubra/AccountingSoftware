using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface IUserData
    {
        List<UserModel> GetUserById(string Id);
        List<UserModel> GetAllUsers();
        void RegisterUser(UserModel user);
        void UpdateUser(UserModel user);
    }
}