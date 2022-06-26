using ASDataManager.Library.DataAccess;
using ASDataManager.Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AccountingSoftwareApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceData _invoiceData;

        public InvoiceController(IInvoiceData invoiceData)
        {
            _invoiceData = invoiceData;
        }

        [Authorize(Roles = "Accountant")]
        [HttpGet]
        public List<InvoiceDBModel> GetInvoices()
        {
            return _invoiceData.GetAllInvoices();
        }

        [Authorize(Roles = "Accountant")]
        [Route("GetInvoiceById")]
        [HttpGet]
        public InvoiceDBModel getInvoice(int InvoiceId)
        {
            return _invoiceData.GetInvoiceById(InvoiceId);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public void PostInvoice([FromBody] InvoiceModel invoice)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            _invoiceData.SaveInvoiceRecord(invoice, userId);
        }
    }
}
