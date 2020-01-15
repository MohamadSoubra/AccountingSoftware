CREATE PROCEDURE [dbo].[spSaleDetail_Insert]
	@SaleId int,
	@ProductId int,
	@Quantity int,
	@PurchasePrice money,
	@Tax money
AS
begin 
	set nocount on;

	insert into dbo.SaleDetail (SaleId, ProductId, Quantity, PurchasePrice, Tax)
	values (@SaleId, @ProductId, @Quantity, @PurchasePrice, @Tax);
	--Reducing Qunatity from Stock
	Update dbo.Product set QuantityInStock = QuantityInStock - @Quantity where @ProductId = Id;
end 