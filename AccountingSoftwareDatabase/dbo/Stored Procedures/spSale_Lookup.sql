CREATE PROCEDURE [dbo].[spSale_Lookup]
	@CashierId nvarchar(128),
	@SaleDate datetime2 = null,
	@Id int = null
AS
begin
	set nocount on;

	select [Id], [CashierId], [SaleDate], [SubTotal], [Tax], [Total], [Active]
	from dbo.Sale
	where (@SaleDate is null and CashierId = @CashierId)
	or (SaleDate = @SaleDate and CashierId = @CashierId)
	or (@id = null and SaleDate = @SaleDate and CashierId = @CashierId)
	or (@id = null and CashierId = @CashierId)
	or (id = Id and CashierId = @CashierId)
end
