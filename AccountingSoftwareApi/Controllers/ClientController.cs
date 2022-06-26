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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult PostClients([FromBody] List<ClientModel> clients)
        {
            _clientData.PostClients(clients);

            return Ok();
        }
    }
}