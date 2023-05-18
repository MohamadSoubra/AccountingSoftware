CREATE PROCEDURE [dbo].[spClient_Delete]
	@Id nvarchar(max)

AS
begin
	set nocount on;
	update Client set Active = 0 WHERE Id = @Id
end
GO
