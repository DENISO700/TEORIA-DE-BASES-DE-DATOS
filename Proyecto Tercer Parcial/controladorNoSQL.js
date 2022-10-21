import cassandra from './conexionNoSQL.js'

var cliente = new cassandra.Client({contactPoints:['127.0.0.1'],localDataCenter:'datacenter1',keyspace:'Northwind'})

export const getCustomers= async (req,res)=>{

    cliente.connect() 
    const query = 'SELECT * FROM "dbo_Customers";'

    cliente.execute(query).then(result => res.json(result.rows));

}

export const getEmployees= async (req,res)=>{
    cliente.connect() 
    const query = 'SELECT "EmployeeID", "FirstName", "LastName" FROM "dbo_Employees";'
    cliente.execute(query).then(result => res.json(result.rows));
}

export const getShippers= async (req,res)=>{

    cliente.connect() 
    const query = 'SELECT "ShipperID", "CompanyName", "Phone" FROM "dbo_Shippers";'
    cliente.execute(query).then(result => res.json(result.rows));

}

export const getProducts= async (req,res)=>{
    cliente.connect() 
    const query = 'SELECT "ProductID", "ProductName"\
                   FROM "dbo_Products"\
                   WHERE "UnitsInStock">0 ALLOW FILTERING;'
    cliente.execute(query).then(result => res.json(result.rows));
}

export const getProductsByID= async (req,res)=>{
    const {id} = req.params
    cliente.connect() 
    const query = 'SELECT "UnitPrice", "UnitsInStock", "UnitsOnOrder" FROM "dbo_Products" WHERE "ProductID"=? ALLOW FILTERING';
    cliente.execute(query, [ id ], { prepare : true }).then(result => res.json(result.rows[0]));

}

export const getAllDetailsId= async (req,res)=>{
    const {id} = req.params
    cliente.connect() 
    const query = 'SELECT * FROM "dbo_OrderDetails" WHERE "OrderID"=? ALLOW FILTERING';
    cliente.execute(query, [ id ], { prepare : true }).then(result => res.json(result.rows));
}

export const getLastOrderID= async (req,res)=>{ 
    cliente.connect() 
    const query = 'SELECT MAX("OrderID") AS "OrderID" FROM "dbo_Orders"';
    cliente.execute(query).then(result => res.json(result.rows[0]))
}

export const getAllInfoLastOrderID= async (req,res)=>{
    const {id} = req.params
    cliente.connect() 
    const query = 'SELECT * FROM "dbo_Orders" WHERE "OrderID"=? ALLOW FILTERING';
    cliente.execute(query, [ id ], { prepare : true }).then(result => res.json(result.rows[0]));
}

//PETICIONES POST
export const postOrder= async (req,res)=>{
    const {OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShipVia,Freight,
        ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry,ShippedDate}=req.body

    cliente.connect() 
    const query = 'INSERT INTO "dbo_Orders" ("OrderID", "CustomerID", "EmployeeID", "Freight", \
                          "OrderDate", "RequiredDate", "ShipAddress", "ShipCity", "ShipCountry",\
                          "ShipName", "ShipPostalCode", "ShipRegion", "ShipVia", "ShippedDate")\
                          VALUES    (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

    cliente.execute(query, [ OrderID, CustomerID, EmployeeID, Freight, 
                          OrderDate, RequiredDate, ShipAddress, ShipCity, ShipCountry,
                          ShipName, ShipPostalCode, ShipRegion, ShipVia, ShippedDate ], { prepare : true });

    
    res.json({OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShipVia,Freight,
        ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry,ShippedDate})
    
}

export const postOrderDetail= async (req,res)=>{
    

    const {OrderID,ProductID,UnitPrice,Quantity,Discount}=req.body

    cliente.connect() 
    const query = 'insert into "dbo_OrderDetails"("OrderID", "ProductID", "Discount", "Quantity", "UnitPrice") \
                   values (?,?,?,?,?)'

    cliente.execute(query, [ OrderID, ProductID, Discount, Quantity, UnitPrice ], { prepare : true });

    res.json({OrderID,ProductID,UnitPrice,Quantity,Discount})
    
}

export const putExistencias=async (req,res)=>{

    const {id} = req.params
    const {UnitsInStock,UnitsOnOrder} = req.body

    cliente.connect() 
    const query = 'UPDATE "dbo_Products" \
                    SET  "UnitsInStock"= ?,"UnitsOnOrder"= ?\
                    WHERE "ProductID"=?';

    cliente.execute(query, [ UnitsInStock,UnitsOnOrder,id ], { prepare : true })


    res.json({UnitsInStock,UnitsOnOrder})

}








