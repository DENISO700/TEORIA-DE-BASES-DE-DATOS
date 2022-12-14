/****** Script para el comando SelectTopNRows de SSMS  ******/
use Northwind

/*Listar todos los productos disponibles. No debe presentar los productos que
están descontinuados.  
VALOR: 2% */

select * from Products
where Discontinued='1'

/*Buscar productos por nombre
a.   Se debe permitir que la búsqueda por una expresión regular usa el
operador lógico LIKE
b.   Se debe de reducir la tabla que muestre los productos que cumplen la condición de búsqueda
*/

SELECT * FROM Products
WHERE ProductName LIKE '%Alice%';

/*Actualizar las existencias (unitsInStock) o el precio unitario del producto de un
producto especifico.                                                                   VALOR: 1%
a.   Cualquier modificación se debe guardar en la base de datos.
b.   La interfaz debe pedir el id del producto y darle la opción al usuario para que pueda cambiar ya las existencias o el precio unitario del producto.
*/

UPDATE Products
SET UnitsInStock = '40'
WHERE ProductID = 1;

select * from Products
WHERE ProductID = 1;

UPDATE Products
SET UnitPrice = '54'
WHERE ProductID = 1;

select * from Products
WHERE ProductID = 1;







