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
    //[EnableCors("AllowMyOrigin")]
    public class ProductController : ControllerBase
    {
        private readonly IProductData _productData;

        public ProductController(IProductData productData)
        {
            _productData = productData;
        }

        [Authorize(Roles = "Cashier")]
        [HttpGet]
        [AllowAnonymous]
        //[EnableCors("AllowMyOrigin")]
        public List<ProductModel> Get()
        {
            return _productData.GetProducts();
        }
    }
}