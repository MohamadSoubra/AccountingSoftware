CREATE PROCEDURE [dbo].[spSaleDetail_Insert]
	@ProductId int,
	@Quantity int,
	@UnitPrice money,
	@Tax money,
	@invoiceId int,
	@Description nvarchar
AS
begin 
	set nocount on;

	insert into dbo.SaleDetail (ProductId, Quantity, UnitPrice, Tax, InvoiceId, [Description])
	values (@ProductId, @Quantity, @UnitPrice, @Tax, @invoiceId, @Description);
	--Reducing Qunatity from Stock
	Update dbo.Product set QuantityInStock = QuantityInStock - @Quantity where @ProductId = Id;
end 