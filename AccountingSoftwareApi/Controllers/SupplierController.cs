using ASDataManager.Library.DataAccess;
using ASDataManager.Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;

namespace AccountingSoftwareApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : Controller
    {
        private readonly ISupplierData _supplierData;

        public SupplierController(ISupplierData SupplierData)
        {
            _supplierData = SupplierData;
        }
        
        [Authorize(Roles = "Accountant")]
        [HttpGet]
        public List<SupplierModel> Get()
        {
            return _supplierData.GetSuppliers();
        }

        [Authorize(Roles = "Accountant")]
        [Route("getSupplierByID")]
        [HttpGet]
        public SupplierModel GetSupplierByID(int SupplierId)
        {
            return _supplierData.GetSupplierById(SupplierId);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult PostSuppliers([FromBody] SupplierModel Supplier)
        {
            _supplierData.PostSuppliers(Supplier,false);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [Route("UpdateSupplier")]
        [HttpPut]
        public IActionResult UpdateSupplier([FromBody] SupplierModel Supplier)
        {
            _supplierData.PostSuppliers(Supplier, true);

            return Ok();
        }

    }
}
