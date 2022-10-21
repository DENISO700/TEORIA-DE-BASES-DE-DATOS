import sql from 'mssql'

const dbConfig={
user:"sa",
password:"qwer1234",
server:"localhost",
database:"NORTHWND",
options:{
    encrypt:false,
    trustServerCertificate:true
}


}

export async function conexion(){
const pool = await sql.connect(dbConfig)
return pool
}


export default sql 
