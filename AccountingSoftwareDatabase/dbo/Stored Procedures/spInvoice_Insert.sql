CREATE PROCEDURE [dbo].[spInvoice_Insert]
	@Id int = 0,
	@InvoiceNumber varchar(MAX),
	@ClientId int,
	@Description varchar(MAX),
	@InvoiceDate datetime2(7),
	@PaymentDueDate datetime2(7),
	@AmountDue money,
	@Status varchar(20),
	@SaleId int = 0

AS

BEGIN
	set nocount on;
	set IDENTITY_INSERT [dbo].[Invoice] OFF ;
	INSERT INTO dbo.Invoice (InvoiceNumber, ClientId, [Description], InvoiceDate, PaymentDueDate, AmountDue, [Status], SaleId)
	OUTPUT inserted.Id
	VALUES ( @InvoiceNumber, @ClientId, @Description, @InvoiceDate, @PaymentDueDate, @AmountDue, @Status, ISNULL(@SaleId,0));
	return
END
