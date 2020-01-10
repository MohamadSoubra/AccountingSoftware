/*
 Pre-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be executed before the build script.	
 Use SQLCMD syntax to include a file in the pre-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the pre-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

insert into [dbo].[Product](ProductName, [Description], RetailPrice, QuantityInStock) 
values ('Fan','LG - Remote Controlled','120','22'),
        ('Clothes Iron', 'Panasonic - With Stand', '90','50'),
        ('Television','Samsung 62" 4K','1370','24'),
        ('Juicer','Campomatic', '50','13'),
        ('Oven','MasterChef', '700','200')
        ;
insert into [dbo].[User] (FirstName, LastName,EmailAddress)
values('Mohamad','Soubra','mhmd@email.com')


