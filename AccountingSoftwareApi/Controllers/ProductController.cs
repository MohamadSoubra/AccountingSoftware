using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        public IActionResult PostProducts([FromBody] ProductModel product)
        {
            _productData.PostProduct(product);

            return Ok();
        }

        [Authorize(Roles = "Accountant")]
        [Route("getProductByID")]
        [HttpGet]
        public ProductModel getProductByID(int ProductId)
          {
            var x = _productData.GetProductById(ProductId);
            return _productData.GetProductById(ProductId);
        }

        [Authorize(Roles = "Admin")]
        [Route("UpdateProduct")]
        [HttpPut]
        public void UpdateProduct([FromBody] ProductModel product)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            _productData.PostProduct(product, true);
        }



        [Authorize(Roles ="Accountant")]
        [HttpDelete]
        public void DeleteProducts([FromBody] int[] productsIds)
        {
            _productData.DeleteProducts(productsIds);
        }
    }
}