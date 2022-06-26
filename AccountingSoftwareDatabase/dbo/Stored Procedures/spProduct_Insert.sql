CREATE PROCEDURE [dbo].[spProduct_Insert]
	--@Id int = SCOPE_IDENTITY,
	@ProductName nvarchar(100),
	@Description nvarchar(max),
	@RetailPrice money,
	@QuantityInStock int,
    @IsTaxable BIT

AS
begin
	set nocount on;
	set IDENTITY_INSERT [dbo].[Product] OFF ;
	insert into dbo.Product(ProductName, [Description],  RetailPrice, QuantityInStock, IsTaxable)
	values(@ProductName ,@Description, @RetailPrice, @QuantityInStock, @IsTaxable);
	--set IDENTITY_INSERT [dbo].[Product] OFF ;
end