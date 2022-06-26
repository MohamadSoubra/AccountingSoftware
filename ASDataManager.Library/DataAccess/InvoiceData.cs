using ASDataManager.Library.Internal.DataAccess;
using ASDataManager.Library.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ASDataManager.Library.DataAccess
{
    public class InvoiceData : IInvoiceData
    {
        private readonly ISQLDataAccess _sql;
        private readonly ISaleData _saleData;

        public InvoiceData(ISQLDataAccess sql, ISaleData saleData)
        {
            _sql = sql;
            _saleData = saleData;
        }

        public List<InvoiceDBModel> GetAllInvoices()
        {
            var result = _sql.LoadData<InvoiceDBModel, dynamic>("spInvoice_GetAll", new { }, "ASDatabase");

            return result;
        }

        public InvoiceDBModel GetInvoiceById(int id)
        {
            var result = _sql.LoadData<InvoiceDBModel, dynamic>("spInvoice_GetById", new { Id = id }, "ASDatabase").FirstOrDefault();
            return result;
        }

        public void SaveInvoiceRecord(InvoiceModel invoice, string cashierId)
        {

            //Was copying what Tim corey had done in sale data but what I learned is
            //copying a bunch of code is bad and takes more time than building it peice by peice

            //Throwing an exception if Invoice exists in the database
            var Invoicelookup = _sql.LoadData<InvoiceDBModel, dynamic>("spInvoice_GetById", new { Id = invoice.Id }, "ASDatabase").FirstOrDefault();
            var clientLookup = _sql.LoadData<ClientModel, dynamic>("spClient_GetById", new { Id = invoice.Client.Id }, "ASDatabase").FirstOrDefault();
            if (Invoicelookup != null)
            {
                throw new Exception("Invoice Already Exists");
            }

            if (clientLookup == null)
            {
                throw new Exception("This client does not exist");
            }


            InvoiceDBModel invoiceDB = new InvoiceDBModel {
                ClientId = invoice.Client.Id,
                InvoiceNumber = invoice.InvoiceNumber,
                Description = invoice.Description,
                InvoiceDate = (DateTime)invoice.InvoiceDate,
                PaymentDueDate = (DateTime)invoice.PaymentDueDate,
                AmountDue = invoice.AmountDue,
                Status = invoice.Status
            };

            try
            {

                invoice.Id = _sql.SaveData("spInvoice_Insert", invoiceDB, "ASDatabase");

                if (invoice.Sale != null)
                {
                    _saleData.SaveSale(invoice.Sale, cashierId, invoice.Id);
                }
            }
            catch (Exception)
            {

                throw;
            }


        }
    }
}
