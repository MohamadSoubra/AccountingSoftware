﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDesktopUI.Library.Helpers
{
    public class ConfigHelper : IConfigHelper
    {
        //TODO: Move this method from config to the API
        public decimal GetTaxRate()
        {
            string ratetext = ConfigurationManager.AppSettings["taxRate"];

            bool IsValidTaxRate = Decimal.TryParse(ratetext, out decimal output);

            if (IsValidTaxRate == false)
            {
                throw new ConfigurationErrorsException("The tax rate is not set up properly");
            }

            return output;
        }
    }
}
