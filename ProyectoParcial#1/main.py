from conexion_sqlserver import*
from tkinter.ttk import *
from tkinter import *
from tkinter import messagebox, ttk

def center(win):
        win.update_idletasks()
        width = win.winfo_width()
        frm_width = win.winfo_rootx() - win.winfo_x()
        win_width = width + 2 * frm_width
        height = win.winfo_height()
        titlebar_height = win.winfo_rooty() - win.winfo_y()
        win_height = height + titlebar_height + frm_width
        x = win.winfo_screenwidth() // 2 - win_width // 2
        y = win.winfo_screenheight() // 2 - win_height // 2
        win.geometry('{}x{}+{}+{}'.format(width, height, x, y))
        win.deiconify()

def llenarTabla(criterio,tipo):

            datos=consulta(criterio,tipo)
            espacio=100

            
            tabla.delete(*tabla.get_children())
            #Asigna el nombre de las columnas
            tabla["column"] = list(datos.columns)
            #declara que las columnas se muestren la tabla de la ventana
            tabla["show"] = "headings"

            #Muestra cada interfaz en la interfaz
            for column in tabla["columns"]:
               tabla.heading(column, text=column,anchor=W) #Hace el encabezado= nombre de la columna
               tabla.column(column, width=espacio, stretch=False)

            df_rows = datos.to_numpy().tolist() # convierte el marco de datos en una lista de listas
            for row in df_rows:
                tabla.insert("", "end", values=row) # inserta cada lista en la treeview.

            inp3.delete(0,END)
            inp4.delete(0,END)       






#interfaz
root = Tk()
root.geometry("1070x530")
root.title('Proyecto 1 | Denis Ordoñez | 20171002520')
root.resizable(0, 0)
center(root)



                     
#titulo
titulo= Label(root, text="Proyecto Primer Parcial")
titulo.place(relx=0.2, rely=0.02, height=35, width=600)
titulo.config(font=("Impact",26), fg="black")

# Llenar productos no discontinuados
e1= Label(root, text="Productos no discontinuados")
e1.place(relx=0.01, rely=0.10, height=30, width=200)
btn1 = ttk.Button(root, text='Mostrar', command=lambda:llenarTabla("0",1))
btn1.place(relx=0.2, rely=0.10, height=25, width=200)

# Llenar productos por nombre

e2= Label(root, text="Buscar Productos por Nombre")
e2.place(relx=0.01, rely=0.18, height=30, width=200)
inp2 = ttk.Entry(root)
inp2.place(relx=0.2, rely=0.18, height=25, width=200)

btn2 = ttk.Button(root, text='Buscar', command=lambda: llenarTabla(inp2.get(),2))
btn2.place(relx=0.4, rely=0.18, height=25, width=200)

#Actualizar datos de productos por id

e3= Label(root, text="Actualizar informacion de productos")
e3.place(relx=0.01, rely=0.25, height=30, width=200)
id = StringVar()

e4= Label(root, text="Id Producto --->")
e4.place(relx=0.2, rely=0.25, height=30, width=100)
inp3 = ttk.Entry(root, textvariable=id)
inp3.place(relx=0.3, rely=0.25, height=25, width=100)

e5= Label(root, text="Valor Nuevo --->")
e5.place(relx=0.4, rely=0.25, height=30, width=100)
unit = StringVar()
inp4 = ttk.Entry(root, textvariable=unit)
inp4.place(relx=0.5, rely=0.25, height=25, width=100)


btn3 = ttk.Button(root, text='Actualizar Precio', command=lambda: llenarTabla((inp3.get(),inp4.get()),3))
btn3.place(relx=0.6, rely=0.25, height=25, width=200)

btn4 = ttk.Button(root, text='Actualizar Unidades', command=lambda: llenarTabla([inp3.get(),inp4.get()],4))
btn4.place(relx=0.8, rely=0.25, height=25, width=200)


frame1 = LabelFrame(root, text="Datos obtenidos de la consulta SQL ",bg="snow3",font=("Goudy old style",15))
frame1.place(relx=0.01, rely=0.32, height=350, width=1050)
tabla = ttk.Treeview(frame1)
tabla.place(relheight=1, relwidth=1)
treescrolly = Scrollbar(frame1, orient="vertical", command=tabla.yview) 
treescrollx = Scrollbar(frame1, orient="horizontal", command=tabla.xview) 
tabla.configure(xscrollcommand=treescrollx.set, yscrollcommand=treescrolly.set) # assigna el scrollbarsen el Treeview Widget
treescrollx.pack(side="bottom", fill="x") # hacer que la barra de desplazamiento llene el eje x del widget Treeview
treescrolly.pack(side="right", fill="y") # hacer que la barra de desplazamiento llene el eje y del widget Treeview

root.mainloop()



