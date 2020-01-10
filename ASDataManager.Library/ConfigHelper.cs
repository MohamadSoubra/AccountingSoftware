using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDataManager.Library
{
    public class ConfigHelper
    {
        private readonly IConfiguration _config;

        public ConfigHelper(IConfiguration config)
        {
            _config = config;
        }


        public decimal GetTaxRate()
        {
            //string ratetext = ConfigurationManager.AppSettings["taxRate"];
            string ratetext = _config.GetSection("taxRate").Value;



            bool IsValidTaxRate = Decimal.TryParse(ratetext, out decimal output);

            if (IsValidTaxRate == false)
            {
                throw new ConfigurationErrorsException("The tax rate is not set up properly");
            }

            return output;
        }
    }
}
