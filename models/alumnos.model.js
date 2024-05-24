import { pool } from '../database/connection.js'

const argumento = process.argv.slice(2);
const opcion = argumento[0];
let nombre = argumento[1];
let rut = argumento[2];
let curso = argumento[3];
let nivel = argumento[4];


//Todos los alumnos, GET
const buscarTodos = async () => {
    try{
        const  text = "SELECT * FROM ALUMNOS"
        const { rows } = await pool.query(text)
        console.log('Alumnos inscritos en la escuela:', rows )
    
        }catch (error){
            console.log(error.message)
        }
        
    }

 //buscarTodos()

//BUSCAR ALUMNOS POR RUT, GET

const encontrarRut = async () => {
    try{
    const  consulta = "SELECT * FROM ALUMNOS WHERE RUT = $1"
    const values = [rut]
    const { rows } = await pool.query(consulta, values);
    console.log(rows)

    }catch (error){
        console.log(error.message)
    }
    
}
//encontrarRut()


//INGRESAR NUEVO ESTUDIANTE, POST
const ingresar = async () => {
    try {
        const text =
          "INSERT INTO alumnos(nombre, rut, curso, nivel) values($1, $2, $3, $4) returning *";
        const values = [nombre, rut, curso, nivel];
        await pool.query(text, values);
        console.log(`El alumno ${nombre} fue agregado correctamente`);
      } catch (error) {
        console.log(error.message);
      }
    };

//ingresar()
    


const actualizar = async () => {
    try {
        const text =
          "UPDATE alumnos set nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *";
        const values = [nombre, curso, nivel, rut];
        const response = await pool.query(text, values);
        console.log(`El alumno ${nombre} fue actualizado en la base de datos`);
      } catch (error) {
        console.log(error);
      }
    };
//actualizar()


const eliminar = async () => {
    try {
        const text = "delete from alumnos where rut = $1";
        const values = [rut];
        const response = await pool.query(text, values);
        console.log(`Registro de alumno con RUT ${rut} eliminado correctamente`);
      } catch (error) {
        console.log(error.message);
      }
    };

//eliminar()

if (opcion === "agregar") {
    ingresar();
  } else if (opcion === "mostrar") {
    buscarTodos();
  } else if (opcion === "consultaRut") {
    encontrarRut();
    rut = argumento[1]
  } else if (opcion === "editar") {
    actualizar();
  } else if (opcion === "eliminar") {
      rut = argumento[1]
    eliminar();
  } else {
    console.log("selecciona una opcion valida");
  }

export const alumnosModel = {
    buscarTodos,
    encontrarRut,
    ingresar,
    actualizar,
    eliminar
}