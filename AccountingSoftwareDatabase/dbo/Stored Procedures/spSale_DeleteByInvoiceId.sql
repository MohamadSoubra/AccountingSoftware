CREATE PROCEDURE [dbo].[spSale_DeleteByInvoiceId]
	@Id int = 0
AS
BEGIN
	set nocount on;
	update Sale set Active = 0 where InvoiceId = @Id;
End

