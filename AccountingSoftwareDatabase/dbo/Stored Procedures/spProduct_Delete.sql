CREATE PROCEDURE [dbo].[spProduct_Delete]
	@Ids nvarchar(max)

AS
begin
	set nocount on;
	Delete From Product WHERE Id IN (SELECT DATA FROM dbo.Split( @Ids,','))
end
GO
