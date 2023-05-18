CREATE TABLE [dbo].[Supplier]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
    [SupplierName] NVARCHAR(50) NOT NULL,
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [EmailAddress] NVARCHAR(256) NOT NULL, 
    [Address] NVARCHAR(MAX) NOT NULL, 
    [PhoneNumber] NVARCHAR(50) NOT NULL, 
    [Country] NVARCHAR(50) NULL, 
    [City] NVARCHAR(50) NULL, 
    [Active] BIT NULL DEFAULT 1
)
