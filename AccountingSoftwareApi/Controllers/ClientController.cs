using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASDataManager.Library.DataAccess;
using ASDataManager.Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AccountingSoftwareApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : Controller
    {
        private readonly IClientData _clientData;

        public ClientController(IClientData clientData)
        {
            _clientData = clientData;
        }

        [Authorize(Roles = "Accountant")]
        [HttpGet]
        public List<ClientModel> Get()
        {
            return _clientData.GetClients();
        }

        [Authorize(Roles = "Accountant")]
        [Route("getClientByID")]
        [HttpGet]
        public ClientModel GetClientByID(int ClientId)
        {
            return _clientData.GetClientById(ClientId);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult PostClients([FromBody] ClientModel client)
        {
            _clientData.PostClients(client);

            return Ok();
        } 
        
        [Authorize(Roles = "Admin")]
        [Route("UpdateClient")]
        [HttpPut]
        public IActionResult UpdateClient([FromBody] ClientModel client)
        {
            _clientData.PostClients(client,true);

            return Ok();
        }

        [Authorize(Roles = "Accountant")]
        [Route("DeleteClient")]
        [HttpDelete]
        public void DeleteClient([FromBody] int ClientID)
        {
            _clientData.DeleteClientRecord(ClientID);
        }

    }
}