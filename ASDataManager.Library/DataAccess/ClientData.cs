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

        public void PostClients(ClientModel Client, bool Update)
        {

            if(Update == false)
            {
                 _sql.SaveData<object>("dbo.spClient_Insert", new { Client.FirstName, Client.LastName, Client.Address, Client.EmailAddress, Client.PhoneNumber }, "ASDatabase");
            }
            else
            {
                 _sql.SaveData<object>("dbo.spClient_Update", new { Client.Id, Client.FirstName, Client.LastName, Client.Address, Client.EmailAddress, Client.PhoneNumber }, "ASDatabase");
            }
        }

        public void DeleteClientRecord(int id)
        {
            _sql.SaveData<object>("dbo.spClient_Delete", new { Id = id }, "ASDatabase");
        }
    }
}
