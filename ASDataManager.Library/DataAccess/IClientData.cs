using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface IClientData
    {
        ClientModel GetClientById(int ClientId);
        List<ClientModel> GetClients();
        void PostClients(List<ClientModel> Clients);
    }
}