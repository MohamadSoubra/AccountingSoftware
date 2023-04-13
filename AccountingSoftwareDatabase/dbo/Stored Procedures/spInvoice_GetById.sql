CREATE PROCEDURE [dbo].[spInvoice_GetById]
	@Id int
AS
begin
	set nocount on;

	SELECT inv.Id, InvoiceNumber, ClientId, [Description], InvoiceDate, PaymentDueDate, AmountDue, [Status], sale.SubTotal, sale.Tax, sale.Total, sale.CashierId, sale.SaleDate, sale.id as saleid
	FROM dbo.Invoice inv join dbo.Sale sale on inv.SaleId = sale.Id
	WHERE inv.Id = @Id;
end