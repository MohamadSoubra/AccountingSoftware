CREATE PROCEDURE [dbo].[spSale_Lookup]
	@CashierId nvarchar(128)= null,
	@InvoiceID int = null,
	@SaleDate datetime2 = null,
	@Id int = null
AS
begin
	set nocount on;

	select [Id], [CashierId], [InvoiceID], [SaleDate], [SubTotal], [Tax], [Total], [Active]
	from dbo.Sale
	where (@SaleDate is null and CashierId = @CashierId)
	or (SaleDate = @SaleDate and CashierId = @CashierId)
	or (@Id = null and SaleDate = @SaleDate and CashierId = @CashierId)
	or (@Id = null and CashierId = @CashierId)
	or (Id = Id and CashierId = @CashierId)
	or (InvoiceID = @InvoiceID)
	and (Active = 1)
end
