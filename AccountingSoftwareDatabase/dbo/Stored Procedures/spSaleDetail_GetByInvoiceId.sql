CREATE PROCEDURE [dbo].[spSaleDetail_GetByInvoiceId]
	@Id int = 0
AS
BEGIN
	set nocount on;
	Select P.productName, P.[Description], P.RetailPrice, Sd.Quantity, S.SubTotal, S.Tax, S.Total
	from SaleDetail Sd join Sale S on sd.SaleId = s.Id
	join Product P on Sd.ProductId = P.Id
	Where Sd.InvoiceId = @Id
End