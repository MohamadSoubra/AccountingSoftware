CREATE PROCEDURE [dbo].[spSale_Insert]
	@Id int output,
	@CashierId nvarchar(128),
	@invoiceID int,
	@SaleDate datetime2,
	@SubTotal money,
	@Tax money,
	@Total money
AS
begin
	set nocount on;

	insert into dbo.Sale(CashierId, InvoiceID, SaleDate, SubTotal, Tax, Total)
	Values (@CashierId, @invoiceID, @SaleDate, @SubTotal, @Tax, @Total);

	select @Id = SCOPE_IDENTITY();
end