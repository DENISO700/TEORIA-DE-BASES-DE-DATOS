function getClientes() {
  axios({

    method: 'GET', //metodo de solicitud
    url: 'http://localhost:3300/customers', //url del API
    responseType: 'json', //tipo de respuesta

}).then(res => { //inicia la promesa

    for (const key in res.data) {
      document.getElementById("clientes").innerHTML +=
  
          `  <option value="${res.data[key].CustomerID}">${res.data[key].CompanyName}</option>`;

  }




}).catch(error => { //captura de errores
    console.error(error); //imprime un erro en caso de existir

});

}

function getEmpleados() {
  axios({

    method: 'GET', //metodo de solicitud
    url: 'http://localhost:3300/employees', //url del API
    responseType: 'json', //tipo de respuesta

}).then(res => { //inicia la promesa

    for (const key in res.data) {
      document.getElementById("empleados").innerHTML +=
  
          `  <option value="${res.data[key].EmployeeID}">${res.data[key].FirstName+' '+res.data[key].LastName}</option>`;

  }




}).catch(error => { //captura de errores
    console.error(error); //imprime un erro en caso de existir

});

}

function getShippers() {
  axios({

    method: 'GET', //metodo de solicitud
    url: 'http://localhost:3300/shippers', //url del API
    responseType: 'json', //tipo de respuesta

}).then(res => { //inicia la promesa

    for (const key in res.data) {
      document.getElementById("agencia").innerHTML +=
  
          `  <option value="${res.data[key].ShipperID}">${res.data[key].CompanyName}</option>`;

  }




}).catch(error => { //captura de errores
    console.error(error); //imprime un erro en caso de existir

});

}

function getProducts() {
  axios({

    method: 'GET', //metodo de solicitud
    url: 'http://localhost:3300/products', //url del API
    responseType: 'json', //tipo de respuesta

}).then(res => { //inicia la promesa

    for (const key in res.data) {
      document.getElementById("productos").innerHTML +=
  
          `  <option value="${res.data[key].ProductID}">${res.data[key].ProductName}</option>`;

  }

}).catch(error => { //captura de errores
    console.error(error); //imprime un erro en caso de existir

});

}

function getProductsByID() {
  url1='http://localhost:3300/products/' + document.getElementById('productos').value
  //Peticion Asincrona
  axios({

      method: 'GET', //metodo de solicitud
      url:url1, //url del API
      responseType: 'json', //tipo de respuesta
  }).then(res => { //inicia la promesa
    document.getElementById('precio').value=res.data.UnitPrice
    document.getElementById('descuento').value=random()/100

  }).catch(error => { //captura de errores
      console.error(error); //imprime un erro en caso de existir
  });

}

function random() {
  return Math.floor((Math.random() * (100 - 0 + 1)) + 0);
}

function fechas(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+2);
  var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
  document.getElementById('fechaO').value = date + ' '+ time;
  document.getElementById('fechaR').value = date2 + ' '+ time;
  document.getElementById('fechaE').value = " "
}

function mostrarDetalles(){

  document.getElementById("detallesOrdenDOM").style.display = 'block'; // show
  document.getElementById("tituloDetalles").style.display = 'block'; // show

}

function nuevaOrden() {


  let orden = {
    CustomerID:document.getElementById('clientes').value,
    EmployeeID:document.getElementById('empleados').value,
    OrderDate:document.getElementById('fechaO').value,
    RequiredDate:document.getElementById('fechaR').value,
    ShipVia:document.getElementById('agencia').value,
    Freight:document.getElementById('Freight').value,
    ShipName:document.getElementById('ShipName').value,
    ShipAddress:document.getElementById('ShipAddress').value,
    ShipCity:document.getElementById('ShipCity').value,
    ShipRegion:document.getElementById('ShipRegion').value,
    ShipPostalCode:document.getElementById('ShipPostalCode').value,
    ShipCountry:document.getElementById('ShipCountry').value
}

  //Peticion Asincrona
  axios({
      method: 'POST', //metodo de solicitud
      url: 'http://localhost:3300/order', //url del API
      responseType: 'json', //tipo de respuesta
      data: orden
  }).then(res => { //inicia la promesa
      mostrarDetalles()

  }).catch(error => { //captura de errores
      console.error(error); //imprime un error en caso de existir
  });
}

function lastID() {
  axios({

    method: 'GET', //metodo de solicitud
    url: 'http://localhost:3300/lastOrder', //url del API
    responseType: 'json', //tipo de respuesta

}).then(res => { //inicia la promesa
    nuevoDetalleOrden(res.data)

    let descuento=parseFloat(document.getElementById('precio').value)*document.getElementById('descuento').value
    let total=parseInt(document.getElementById('cantidad').value)*(parseFloat(document.getElementById('precio').value)-descuento)
    document.getElementById("DetalleFactura").insertRow(-1).innerHTML = 
    '<td>'+res.data+'</td>\
    <td>'+document.getElementById('productos').value+'</td>\
    <td>'+document.getElementById('cantidad').value+'</td>\
    <td>'+document.getElementById('descuento').value+'</td>\
    <td>'+document.getElementById('precio').value+'</td>\
    <td>+'+total.toFixed(2)+'</td>';

    document.getElementById("generar").style.display = 'block'; // show

}).catch(error => { //captura de errores
    console.error(error); //imprime un erro en caso de existir

});

}

function nuevoDetalleOrden(id) {

  let detalle = {
    OrderID:id,
    ProductID:document.getElementById('productos').value,
    UnitPrice:document.getElementById('precio').value,
    Quantity:document.getElementById('cantidad').value,
    Discount:document.getElementById('descuento').value,
}
  //Peticion Asincrona
  axios({
      method: 'POST', //metodo de solicitud
      url: 'http://localhost:3300/orderDetail', //url del API
      responseType: 'json', //tipo de respuesta
      data: detalle
  }).then(res => { //inicia la promesa
      updateExistencias()

  }).catch(error => { //captura de errores
      console.error(error); //imprime un error en caso de existir
  });
}

function updateExistencias() {

  //Peticion Asincrona
  axios({

      method: 'PUT', //metodo de solicitud
      url: 'http://localhost:3300/existencias/'+
      document.getElementById('productos').value+'/'+
      document.getElementById('cantidad').value, //url del API
      responseType: 'json', //tipo de respuesta
  }).then(res => { //inicia la promesa
      console.log(res.data);

  })
}

function info() {
  axios({

    method: 'GET', //metodo de solicitud
    url: 'http://localhost:3300/infoFacturaOrder', //url del API
    responseType: 'json', //tipo de respuesta

}).then(res => { //inicia la promesa
    idOrden=res.data.OrderID;
    idCliente=res.data.CustomerID;
    idEmpleado=res.data.EmployeeID;
    idEE=res.data.ShipVia;
    peso=res.data.Freight;
    ShipName=res.data.ShipName;
    ShipAddress=res.data.ShipAddress;
    ShipCity=res.data.ShipCity;
    ShipRegion=res.data.ShipRegion;
    ShipCountry=res.data.ShipCountry;
    ShipPostalCode=res.data.ShipPostalCode;
    OrderDate=res.data.OrderDate;
    RequiredDate=res.data.RequiredDate
    
    document.write("<h1><b>"+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'Factura Northwind</b></h1>');
    document.write("<b>Id de la orden:</b>"+'&nbsp;'+idOrden+'&nbsp;'+'&nbsp;');
    document.write("<b>Id del Cliente:</b>"+'&nbsp;'+idCliente+'&nbsp;'+'&nbsp;');
    document.write("<b>Id del Empleado:</b>"+'&nbsp;'+idEmpleado+"<br>"+"<br>");
    document.write("<b>Id de Envio:</b>"+'&nbsp;'+idEE+'&nbsp;'+'&nbsp;');
    document.write("<b>Peso:</b>"+'&nbsp;'+peso+'&nbsp;'+'&nbsp;');
    document.write("<b>Nombre del Barco:</b>"+'&nbsp;'+ShipName+"<br>"+"<br>");
    document.write("<b>Direccion del Envio:</b>"+'&nbsp;'+ShipAddress+"<br>"+"<br>");
    document.write("<b>Ciudad del Envio:</b>"+'&nbsp;'+ShipCity+'&nbsp;'+'&nbsp;');
    document.write("<b>Region de Envio:</b>"+'&nbsp;'+ShipRegion+"<br>"+"<br>");
    document.write("<b>Pais de Envio:</b>"+'&nbsp;'+ShipCountry+'&nbsp;'+'&nbsp;');
    document.write("<b>Codigo Postal del Envio:</b>"+'&nbsp;'+ShipPostalCode+"<br>"+"<br>");
    document.write("<b>Fecha de la orden:</b>"+'&nbsp;'+OrderDate+"<br>"+"<br>");
    document.write("<b>Fecha requerida:</b>"+'&nbsp;'+RequiredDate+"<br>"+"<br>");

    generarFactura(res.data.OrderID)
    //window.print()

}).catch(error => { //captura de errores
    console.error(error); //imprime un erro en caso de existir

});

}

function generarFactura(id){

  var total=0;
  var subtotal=0;
  var iva=0;
  var subtotalP=0;
  var descuento=0;

  axios({

    method: 'GET', //metodo de solicitud
    url: 'http://localhost:3300/infoDetails/'+id, //url del API
    responseType: 'json', //tipo de respuesta

  }).then(res => { //inicia la promesa

    document.write('<table class="table table-striped" id="tablaprueba">\
    <thead>\
      <tr>\
        <th>Id Producto'+'&nbsp;'+'&nbsp;'+'</th>\
        <th class="text-right">'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'Cantidad'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'</th>\
        <th class="text-right">'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'Descuento'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'</th>\
        <th class="text-right">'+'&nbsp;'+'&nbsp;'+'Precio     </th>\
      </tr>\
    </thead>\
    <tbody id="DFactura"></tbody>')
      
    for (const key in res.data) {

      document.getElementById("DFactura").insertRow(-1).innerHTML = 
                    '<td class="align="center" >'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+
                    res.data[key].ProductID+'</td>\
                    <td class="align="center" >'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+
                    res.data[key].Quantity+'</td>\
                    <td class="align="center" >'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;Lps. '
                    +res.data[key].Discount.toFixed(2)+'</td>\
                    <td class="align="center" >'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;Lps. '
                    +res.data[key].UnitPrice+'</td>'

      descuento=res.data[key].UnitPrice*res.data[key].Discount
      subtotal=(res.data[key].Quantity*(res.data[key].UnitPrice-descuento));
      subtotalP=subtotalP+subtotal;
      iva=subtotalP*0.15;
      total=subtotalP+iva;   
  }
  document.write('<table class="table table-striped" id="FFFactura">\
  <tbody id="FFactura"></tbody>')
    
    document.getElementById("FFactura").insertRow(-1).innerHTML =

                                      ' <tr>\
                                        <td class="align="center" >'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;\
                                        '+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;\
                                        <b>Subtotal:</b></td>\
                                        <td class="align="center" >Lps.'+'&nbsp;'+subtotalP.toFixed(2)+'</td><br>\
                                        </tr>'

    document.getElementById("FFactura").insertRow(-1).innerHTML =

                                      ' <tr>\
                                        <td class="align="center" >'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;\
                                        '+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;\
                                        <b>ISV 15%:</b></td>\
                                        <td class="align="center" >Lps. '+iva.toFixed(2)+'</td><br>\
                                        </tr>'

    document.getElementById("FFactura").insertRow(-1).innerHTML =

                                        ' <tr>\
                                          <td class="align="center" >'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;\
                                          '+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;'+'&nbsp;\
                                          <b>Total:</b></td>\
                                          <td class="align="center" >Lps. '+total.toFixed(2)+'</td><br>\
                                          </tr>'
    window.print()
    
  }).catch(error => { //captura de errores
    console.error(error); //imprime un erro en caso de existir

  });
}


getClientes();
getEmpleados();
getShippers();
getProducts();






