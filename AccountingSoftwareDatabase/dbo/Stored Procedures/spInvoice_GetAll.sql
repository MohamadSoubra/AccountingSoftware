CREATE PROCEDURE [dbo].[spInvoice_GetAll]
AS
begin
	set nocount on;

	SELECT Id, ClientId, [Description], InvoiceDate, PaymentDueDate, AmountDue 
	FROM dbo.Invoice
	ORDER BY ClientId;
end
