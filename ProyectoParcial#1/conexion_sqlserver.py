import pyodbc
import pandas as pd
from tkinter import messagebox, ttk
#pyinstaller --windowed --onefile test.py
#pyinstaller --windowed --onefile --icon=direccionArchivo test.py
def consulta(criterio,opcion):
    
        #connection = pyodbc.connect('DRIVER={SQL Server};SERVER=DLCN;DATABASE=Northwind;UID=sa;PWD=123456')
        connection = pyodbc.connect('DRIVER={SQL Server};SERVER=DLCN;DATABASE=Northwind;Trusted_Connection=yes;')
        df = pd.DataFrame()

        if opcion==1:
                query="SELECT * FROM Products WHERE Discontinued='0'"
                df = pd.read_sql(query, connection)
                connection.close()
                

        elif opcion==2:

                if criterio:
          
                    query="SELECT * FROM Products WHERE ProductName LIKE '%"+criterio+"%';"
                    df = pd.read_sql(query, connection)
                    connection.close()
                else:
                    messagebox.showerror("Buscar por Nombre", "Debe Ingresar el nombre del Producto que desea buscar")                    

                

        elif opcion==3:
                cursor = connection.cursor()
                if criterio[0]:                  
                    if criterio[1] :
                        cursor.execute("UPDATE Products SET UnitPrice = '"+criterio[1]+"' WHERE ProductID = "+criterio[0])
         
                    query = "SELECT * FROM Products WHERE ProductID ="+criterio[0]
                    df = pd.read_sql(query, connection)
                    connection.commit()
                    connection.close()
                
                else:
                    messagebox.showerror("Actualizar Precio Producto", "Debe Ingresar el Id del Producto")

        elif opcion==4:
                cursor = connection.cursor()
                if criterio[0]:                  
                    if criterio[1] :
                        cursor.execute("UPDATE Products SET UnitsInStock = '"+criterio[1]+"' WHERE ProductID = "+criterio[0])
                    query = "SELECT * FROM Products WHERE ProductID ="+criterio[0]
                    df = pd.read_sql(query, connection)
                    connection.commit()
                    connection.close()
                    

                else:
                    messagebox.showerror("Actualizar Unidades Producto", "Debe Ingresar el Id del Producto")
        return df




