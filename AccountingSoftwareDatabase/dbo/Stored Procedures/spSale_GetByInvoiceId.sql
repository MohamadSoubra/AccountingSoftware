CREATE PROCEDURE [dbo].[spSale_GetByInvoiceId]
	@InvoiceId int
AS
begin
	set nocount on;

	select Id, CashierId, InvoiceID, SaleDate, SubTotal, Tax, Total
	from dbo.Sale
	Where InvoiceID = @InvoiceId and Active = 1;
end

