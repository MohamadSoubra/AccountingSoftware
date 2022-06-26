CREATE TABLE [dbo].[Client]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NULL, 
    [EmailAddress] NVARCHAR(256) NULL, 
    [Address] NVARCHAR(MAX) NULL, 
    [PhoneNumber] NVARCHAR(50) NOT NULL, 
    [Active] BIT NOT NULL DEFAULT 1
)
