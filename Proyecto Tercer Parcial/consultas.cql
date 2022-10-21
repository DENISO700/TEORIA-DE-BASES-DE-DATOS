SELECT "CategoryID", "CategoryName", "Description", "Picture"
FROM "dbo_Categories";

SELECT "CustomerID", "Address", "City", "CompanyName", "ContactName", "ContactTitle", "Country", "Fax", "Phone", "PostalCode", "Region"
FROM "dbo_Customers";

SELECT "EmployeeID", "FirstName", "LastName"
FROM "dbo_Employees";

SELECT "EmployeeID", "TerritoryID"
FROM "dbo_EmployeeTerritories";

SELECT "OrderID", "ProductID", "Discount", "Quantity", "UnitPrice"
FROM "dbo_OrderDetails";

SELECT "OrderID", "CustomerID", "EmployeeID", "Freight", "OrderDate", "RequiredDate", "ShipAddress", "ShipCity", "ShipCountry", "ShipName", "ShipPostalCode", "ShipRegion", "ShipVia", "ShippedDate"
FROM "dbo_Orders";

SELECT "ProductID", "CategoryID", "Discontinued", "ProductName", "QuantityPerUnit", "ReorderLevel", "SupplierID", "UnitPrice", "UnitsInStock", "UnitsOnOrder"
FROM "dbo_Products"
WHERE "ProductID"=1 ALLOW FILTERING;

SELECT "RegionID", "RegionDescription"
FROM "dbo_Region";

SELECT "ShipperID", "CompanyName", "Phone"
FROM "dbo_Shippers";

SELECT "SupplierID", "Address", "City", "CompanyName", "ContactName", "ContactTitle", "Country", "Fax", "HomePage", "Phone", "PostalCode", "Region"
FROM "dbo_Suppliers";

SELECT "TerritoryID", "RegionID", "TerritoryDescription"
FROM "dbo_Territories";

SELECT MAX("OrderID") FROM "dbo_Orders";
  
INSERT INTO "dbo_Orders" ("OrderID", "CustomerID", "EmployeeID", "Freight", 
                          "OrderDate", "RequiredDate", "ShipAddress", "ShipCity", "ShipCountry",
                          "ShipName", "ShipPostalCode", "ShipRegion", "ShipVia", "ShippedDate")
                          VALUES    (11127,'VINET',5,32.69,'1996-07-04T00:00:00.000','1996-08-01T00:00:00.000',
                                     '59 rue de lAbbaye','Reims','France','Vins et alcools Chevalier','51100','Europa',
                                     3,'1996-07-16T00:00:00.000');
insert into "dbo_OrderDetails"("OrderID", "ProductID", "Discount", "Quantity", "UnitPrice") 
values (11130,1,0,15,10);

SELECT "OrderID", "ProductID", "Discount", "Quantity", "UnitPrice"
FROM "dbo_OrderDetails"
WHERE "OrderID"=11127 ALLOW FILTERING;

SELECT "OrderID", "CustomerID", "EmployeeID", "Freight", "OrderDate", "RequiredDate", "ShipAddress", "ShipCity", "ShipCountry", "ShipName", "ShipPostalCode", "ShipRegion", "ShipVia", "ShippedDate"
FROM "dbo_Orders"
WHERE "OrderID"=11127 ALLOW FILTERING;

UPDATE "dbo_Products" 
SET  "UnitsInStock"= 1,"UnitsOnOrder"= 1
WHERE "ProductID"=1;

SELECT "ProductID", "ProductName","UnitPrice", "UnitsInStock", "UnitsOnOrder"
FROM "dbo_Products"
WHERE "UnitsInStock">0 ALLOW FILTERING;
                                     
  
  
  
  