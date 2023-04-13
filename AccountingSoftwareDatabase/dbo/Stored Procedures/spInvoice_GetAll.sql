CREATE PROCEDURE [dbo].[spInvoice_GetAll]
AS
begin
	set nocount on;

	SELECT Id, InvoiceNumber, ClientId, [Description], InvoiceDate, PaymentDueDate, AmountDue, [Status]
	FROM dbo.Invoice
	ORDER BY ClientId;
end
