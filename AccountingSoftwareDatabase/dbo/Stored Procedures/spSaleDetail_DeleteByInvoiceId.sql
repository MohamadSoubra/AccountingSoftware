CREATE PROCEDURE [dbo].[spSaleDetail_DeleteByInvoiceId]
	@Id int = 0
AS
BEGIN
	set nocount on;
	update SaleDetail set Active = 0 where InvoiceId = @Id;
End
