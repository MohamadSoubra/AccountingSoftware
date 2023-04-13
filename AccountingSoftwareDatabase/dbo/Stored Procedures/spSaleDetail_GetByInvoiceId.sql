CREATE PROCEDURE [dbo].[spSaleDetail_GetByInvoiceId]
	@Id int = 0
AS
BEGIN
	set nocount on;
	Select Sd.id, SD.InvoiceId, SD.ProductId, P.ProductName, P.[Description], Sd.Quantity, Sd.UnitPrice, sd.Total
	from SaleDetail Sd join Product P on Sd.ProductId = P.Id
	Where Sd.InvoiceId = @Id
End