﻿CREATE PROCEDURE [dbo].[spSale_Insert]
	@Id int output,
	@CashierId nvarchar(128),
	@SaleDate datetime2,
	@Subtotal money,
	@Tax money,
	@Total money
AS
begin
	set nocount on;

	insert into dbo.Sale(CashierId, SaleDate, SubTotal, Tax, Total)
	Values (@CashierId, @SaleDate, @SubTotal, @Tax, @Total);

	select @Id = @@IDENTITY;
end