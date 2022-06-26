CREATE PROCEDURE [dbo].[spInvoice_GetById]
	@Id int
AS
begin
	set nocount on;

	SELECT Id, ClientId, [Description], InvoiceDate, PaymentDueDate, AmountDue
	FROM dbo.Invoice
	WHERE Invoice.Id = @Id;
end