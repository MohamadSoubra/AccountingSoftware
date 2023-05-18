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

        public void DeleteInvoiceRecord(int id)
        {
            _sql.SaveData<object>("dbo.spInvoice_Delete", new { Id = id }, "ASDatabase");
        }

        public void DeleteSaleDetail(int id)
        {
            _sql.SaveData<object>("dbo.spSaleDetail_Delete", new { Id = id }, "ASDatabase");
        }

        public List<InvoiceModel> GetAllInvoices()
        {
            var DBInvoices = _sql.LoadData<InvoiceDBModel, dynamic>("spInvoice_GetAll", new { }, "ASDatabase").ToList();
            List<InvoiceModel> Reultinvoices = new List<InvoiceModel> { };
            foreach (var invoice in DBInvoices)
            {
                var invmodel = new InvoiceModel();
                invmodel.Id = invoice.Id;
                invmodel.InvoiceDate = invoice.InvoiceDate;
                invmodel.InvoiceNumber = invoice.InvoiceNumber;
                invmodel.PaymentDueDate = invoice.PaymentDueDate;
                invmodel.Status = invoice.Status;
                invmodel.AmountDue = invoice.AmountDue;
                invmodel.Description = invoice.Description;
                invmodel.Client = _sql.LoadData<ClientModel, dynamic>("spClient_GetById", new { Id = invoice.ClientId}, "ASDatabase").FirstOrDefault();
                invmodel.Sale = _sql.LoadData<SaleDBModel, dynamic>("spSale_GetById", new { Id = invoice.SaleId }, "ASDatabase").FirstOrDefault();
                Reultinvoices.Add(invmodel);
            }

            return Reultinvoices;
        }

        public InvoiceModel GetInvoiceById(int id)
        {
            var DBInvoice = _sql.LoadData<InvoiceDBModel, dynamic>("spInvoice_GetById", new { Id = id }, "ASDatabase").FirstOrDefault();
            var resultinvoice = _sql.LoadData<InvoiceModel, dynamic>("spInvoice_GetById", new { Id = id }, "ASDatabase").FirstOrDefault();
            resultinvoice.Sale = _sql.LoadData<SaleDBModel, dynamic>("spSale_GetById", new { Id = DBInvoice.SaleId }, "ASDatabase").FirstOrDefault();
            resultinvoice.Client = _sql.LoadData<ClientModel, dynamic>("spClient_GetbyId", new { Id = DBInvoice.ClientId }, "ASDatabase").FirstOrDefault();
            return resultinvoice;
        }
        
        public List<SaleDetailModel> GetInvoiceSaleDetails(int id)
        {
            var result = _sql.LoadData<SaleDetailModel, dynamic>("spSaleDetail_GetByInvoiceId", new { Id = id }, "ASDatabase");
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
                Id = invoice.Id,
                ClientId = invoice.Client.Id,
                SaleId= invoice.Sale.Id,
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
                    _saleData.SaveSale(invoice.SaleDetails, cashierId, invoice.Id);
                }
            }
            catch (Exception)
            {

                throw;
            }


        }
    }
}
