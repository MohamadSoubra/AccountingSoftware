using ASDataManager.Library.Internal.DataAccess;
using ASDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ASDataManager.Library.DataAccess
{
    public class ClientData : IClientData
    {
        private readonly ISQLDataAccess _sql;

        public ClientData(ISQLDataAccess sql)
        {
            _sql = sql;
        }

        public List<ClientModel> GetClients()
        {
            var output = _sql.LoadData<ClientModel, dynamic>("dbo.spClient_GetAll", new { }, "ASDatabase");

            return output;
        }

        public ClientModel GetClientById(int clientId)
        {
            var output = _sql.LoadData<ClientModel, dynamic>("dbo.spClient_GetById", new { Id = clientId }, "ASDatabase").FirstOrDefault();

            return output;
        }

        public void PostClients(List<ClientModel> Clients)
        {
            foreach (var Client in Clients)
            {
                _sql.SaveData<object>("dbo.spClient_Insert", new { Client.FirstName, Client.LastName, Client.Address, Client.EmailAddress, Client.PhoneNumber }, "ASDatabase");

            }
        }
    }
}
