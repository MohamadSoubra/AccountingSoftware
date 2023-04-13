CREATE PROCEDURE [dbo].[spSaleDetail_Insert]
	--@SaleId int,
	@ProductId int,
	@Quantity int,
	@PurchasePrice money,
	@Tax money,
	@invoiceId int
AS
begin 
	set nocount on;

	insert into dbo.SaleDetail (ProductId, Quantity, UnitPrice, Tax, InvoiceId)
	values (@ProductId, @Quantity, @PurchasePrice, @Tax, @invoiceId);
	--Reducing Qunatity from Stock
	Update dbo.Product set QuantityInStock = QuantityInStock - @Quantity where @ProductId = Id;
end 