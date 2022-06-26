CREATE PROCEDURE [dbo].[spInvoice_Insert]

	@InvoiceNumber varchar(MAX),
	@ClientId int,
	@Description varchar(MAX),
	@InvoiceDate datetime2(7),
	@PaymentDueDate datetime2(7),
	@AmountDue money,
	@Status varchar(20)
AS

BEGIN
	set nocount on;
	set IDENTITY_INSERT [dbo].[Invoice] OFF ;
	INSERT INTO dbo.Invoice (InvoiceNumber, ClientId, [Description], InvoiceDate, PaymentDueDate, AmountDue, [Status])
	OUTPUT inserted.Id
	VALUES ( @InvoiceNumber, @ClientId, @Description, @InvoiceDate, @PaymentDueDate, @AmountDue, @Status);
	return
END
