CREATE PROCEDURE [dbo].[spProduct_Update]
	@Id int,
	@ProductName nvarchar(100),
	@Description nvarchar(max),
	@RetailPrice money,
	@QuantityInStock int,
    @IsTaxable BIT

AS
begin
	set nocount on;
	set IDENTITY_INSERT [dbo].[Invoice] OFF ;
	update dbo.Product set 
	ProductName = ISNULL(@ProductName, ProductName), 
	[Description] = ISNULL(@Description, [Description]),
	RetailPrice = ISNULL(@RetailPrice, RetailPrice),
	QuantityInStock = ISNULL(@QuantityInStock, QuantityInStock),
	IsTaxable = ISNULL(@IsTaxable, IsTaxable)
	where Id = @Id
end
