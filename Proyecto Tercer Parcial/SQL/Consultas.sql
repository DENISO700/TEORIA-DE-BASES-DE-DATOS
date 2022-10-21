use NORTHWND

--Al usuario de la app se le presenta el nombre del cliente
SELECT CustomerID,CompanyName FROM Customers

--Al usuario de la app se le presenta el nombre del empleado
SELECT EmployeeID,LastName,FirstName FROM Employees

--Al usuario de la app se le presenta el nombre de la agencia de envío
SELECT ShipperID,CompanyName FROM Shippers

--all orders
SELECT *
FROM Orders
order by OrderID DESC


--ID Ordenes

SELECT OrderID FROM Orders

--ULTIMO  ID 
SELECT TOP 1 * FROM Orders ORDER BY OrderID DESC

--inertar en Orders
insert into Orders (CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,
	ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry)
	values
	('VINET',5,
	'1996-07-04T00:00:00.000','1996-08-01T00:00:00.000','1996-07-16T00:00:00.000',
	3,32.69,'Vins et alcools Chevalier','59 rue de lAbbaye','Reims',NULL,51100,'France')

--orderDetails
SELECT * FROM OrderDetails
WHERE OrderID=11120

--insert details
insert into OrderDetails VALUES('11089',42,14.00,15,0)

--Productos

SELECT ProductID,ProductName FROM Products

--ProductByID
SELECT UnitPrice FROM Products WHERE ProductID=1

--ExistenciasProductos

SELECT ProductID,ProductName,UnitsInStock,UnitsOnOrder FROM Products

--obtener datos de factura
SELECT TOP 1  * FROM Orders ORDER BY OrderID DESC

--actualizar existencias
UPDATE Products
SET 
UnitsInStock = UnitsInStock-2, 
UnitsOnOrder= UnitsOnOrder+2
WHERE ProductID = 1;

--factura

SELECT * 
FROM Orders
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
WHERE Orders.OrderID=11099

