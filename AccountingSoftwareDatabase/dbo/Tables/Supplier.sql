CREATE TABLE [dbo].[Supplier]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
    [AccountNumber] NVARCHAR(50) NOT NULL,
    [CompanyName] NVARCHAR(50) NOT NULL,
    [ContactName] NVARCHAR(50) NULL, 
    [EmailAddress] NVARCHAR(256) NULL, 
    [Address] NVARCHAR(MAX) NULL, 
    [PhoneNumber] NVARCHAR(50) NULL, 
    [Country] NVARCHAR(50) NULL, 
    [City] NVARCHAR(50) NULL, 
    [Active] BIT NULL DEFAULT 1
)
