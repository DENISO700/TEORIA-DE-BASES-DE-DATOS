import sql,{conexion} from './conexion.js'

export const getCustomers= async (req,res)=>{
    const pool = await conexion()
    const resultado = await pool.request().query('SELECT CustomerID,CompanyName FROM Customers')
    res.json(resultado.recordset)

}

export const getEmployees= async (req,res)=>{
    const pool = await conexion()
    const resultado = await pool.request().query('SELECT EmployeeID,LastName,FirstName FROM Employees')
    res.json(resultado.recordset)

}

export const getShippers= async (req,res)=>{
    const pool = await conexion()
    const resultado = await pool.request().query('SELECT ShipperID,CompanyName FROM Shippers')
    res.json(resultado.recordset)

}

export const getProducts= async (req,res)=>{
    const pool = await conexion()
    const resultado = await pool.request().query('SELECT ProductID,ProductName FROM Products')
    res.json(resultado.recordset)

}

export const getProductsByID= async (req,res)=>{
    const {id} = req.params
    const pool = await conexion()
    const resultado = await pool
    .request()
    .input('id',id)
    .query('SELECT UnitPrice FROM Products WHERE ProductID=@id')
    res.json(resultado.recordset[0])

}

export const postOrder= async (req,res)=>{
    const {CustomerID,EmployeeID,OrderDate,RequiredDate,ShipVia,Freight,
        ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry}=req.body

    const pool = await conexion()
    await pool
    .request()
    .input('CustomerID',sql.NChar(5),CustomerID)
    .input('EmployeeID',sql.Int,EmployeeID)
    .input('OrderDate',sql.DateTime,OrderDate)
    .input('RequiredDate',sql.DateTime,RequiredDate)
    .input('ShipVia',sql.Int,ShipVia)
    .input('Freight',sql.Money,Freight)
    .input('ShipName',sql.NVarChar(40),ShipName)
    .input('ShipAddress',sql.NVarChar(60),ShipAddress)
    .input('ShipCity',sql.NVarChar(15),ShipCity)
    .input('ShipRegion',sql.NVarChar(15),ShipRegion)
    .input('ShipPostalCode',sql.NVarChar(10),ShipPostalCode)
    .input('ShipCountry',sql.NVarChar(15),ShipCountry)
    .query(
        'insert into Orders (CustomerID,EmployeeID,OrderDate,RequiredDate,ShipVia,Freight,\
            ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry)\
            values\
            (@CustomerID,@EmployeeID,@OrderDate,@RequiredDate,@ShipVia,@Freight,\
                @ShipName,@ShipAddress,@ShipCity,@ShipRegion,@ShipPostalCode,@ShipCountry)'
        )
    
    res.json({CustomerID,EmployeeID,OrderDate,RequiredDate,ShipVia,Freight,
        ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry})
    
}

export const getAllInfoLastOrderID= async (req,res)=>{
    const pool = await conexion()
    const resultado = await pool.request().query('SELECT TOP 1  * FROM Orders ORDER BY OrderID DESC')
    res.json(resultado.recordset[0])
}

export const getAllDetailsId= async (req,res)=>{
    const {id} = req.params
    const pool = await conexion()
    const resultado = await pool
    .request()
    .input('id',id)
    .query(
        'SELECT * FROM OrderDetails\
        WHERE OrderID=@id'
        )
    res.json(resultado.recordset)
}

export const getLastOrderID= async (req,res)=>{
    const pool = await conexion()
    const resultado = await pool.request().query('SELECT TOP 1 OrderID FROM Orders ORDER BY OrderID DESC')
    res.json(resultado.recordset[0].OrderID)
}

export const postOrderDetail= async (req,res)=>{
    

    const {OrderID,ProductID,UnitPrice,Quantity,Discount}=req.body

    const pool = await conexion()
    await pool
    .request()
    .input('OrderID',sql.Int,OrderID)
    .input('ProductID',sql.Int,ProductID)
    .input('UnitPrice',sql.Money,UnitPrice)
    .input('Quantity',sql.SmallInt,Quantity)
    .input('Discount',sql.Real,Discount)
    .query(
        'insert into OrderDetails VALUES(@OrderID,@ProductID,@UnitPrice,@Quantity,@Discount)'
        )
    
    res.json({OrderID,ProductID,UnitPrice,Quantity,Discount})
    
}

export const putExistencias=async (req,res)=>{

    const {id,cantidad} = req.params

    const pool = await conexion()
    await pool
    .request()
    .input('cantidad',sql.Int,cantidad)
    .input('id',sql.Int,id)
    .query(
        'UPDATE Products\
        SET \
        UnitsInStock = UnitsInStock-@cantidad, \
        UnitsOnOrder= UnitsOnOrder+@cantidad\
        WHERE ProductID = @id;'
    )

    res.json({id,cantidad})

}






