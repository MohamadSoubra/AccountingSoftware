using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASDataManager.Library.DataAccess;
using ASDataManager.Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AccountingSoftwareApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductData _productData;

        public ProductController(IProductData productData)
        {
            _productData = productData;
        }

        [Authorize(Roles = "Accountant")]
        [HttpGet]
        public List<ProductModel> Get()
        {
            return _productData.GetProducts();
        }

        [Authorize(Roles = "Manager")]
        //[Authorize(Roles = "Accountant")]
        [HttpPost]
        public IActionResult PostProducts([FromBody] List<ProductModel> products)
        {
            _productData.PostProducts(products);

            return Ok();
        }


        [Authorize(Roles ="Accountant")]
        [HttpDelete]
        public void DeleteProducts([FromBody] int[] productsIds)
        {
            _productData.DeleteProducts(productsIds);
        }
    }
}