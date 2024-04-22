// Función para mostrar la información de un usuario en el modal
const setInfoModal = (nombre, balance, id) => {
  $("#nombreEdit").val(nombre);
  $("#balanceEdit").val(balance);
  $("#editButton").attr("onclick", `editUsuario('${id}')`);
};




// Función para editar un usuario
const editUsuario = async (id) => {
  const name = $("#nombreEdit").val();
  const balance = $("#balanceEdit").val();
  try {
    const { data } = await axios.put(
      `http://localhost:3000/usuario?id=${id}`,
      { nombre: name, balance }
    ); 
    $("#exampleModal").modal("hide");
    location.reload();
  } catch (e) {
    alert("Algo salió mal..." + e);
  }
};




// Función para eliminar un usuario
$("form:first").submit(async (e) => {
  e.preventDefault();
  let nombre = $("form:first input:first").val();
  let balance = Number($("form:first input:nth-child(2)").val());
  try {
    const response = await fetch("http://localhost:3000/usuario", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, balance }),
    });
    $("form:first input:first").val("");
    $("form:first input:nth-child(2)").val("");
    location.reload();
  } catch (e) {
    alert("Algo salió mal ..." + e);
  }
});




// Función para realizar una transferencia
$("form:last").submit(async (e) => {
  e.preventDefault();
  let emisor = $("form:last select:first").val();
  let receptor = $("form:last select:last").val();
  let monto = $("#monto").val();
  if (!monto || !emisor || !receptor) {
    alert("Debe seleccionar un emisor, receptor y monto a transferir");
    return false;
  }
  try {
    const response = await fetch("http://localhost:3000/transferencia", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emisor, receptor, monto }),
    });
    const data = await response.json();
    location.reload();
  } catch (e) {
    console.log(e);
    alert("Algo salió mal..." + e);
  }
});




// Función para obtener los usuarios
const getUsuarios = async () => {
  const response = await fetch("http://localhost:3000/usuarios");
  let data = await response.json();
  $(".usuarios").html("");

  $.each(data, (i, c) => {
    $(".usuarios").append(`
            <tr>
              <td>${c.nombre}</td>
              <td>${c.balance}</td>
              <td>
                <button class="btn btn-warning mr-2" data-toggle="modal" data-target="#exampleModal" onclick="setInfoModal('${c.nombre}', '${c.balance}', '${c.id}')">
                  Editar
                </button>
                <button class="btn btn-danger" onclick="eliminarUsuario('${c.id}')">
                  Eliminar
                </button>
              </td>
            </tr>
       `);

    $("#emisor").append(`<option value="${c.nombre}">${c.nombre}</option>`);
    $("#receptor").append(`<option value="${c.nombre}">${c.nombre}</option>`);
  });
};




// Función para eliminar un usuario
const eliminarUsuario = async (id) => {
  try {
      const response = await fetch(`http://localhost:3000/usuario?id=${id}`, {
          method: "DELETE",
      });
      const message = await response.text();
      alert(message); 
      getUsuarios();
  } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Ocurrió un error al intentar eliminar el usuario.");
  }
};




// Función para obtener las transferencias
const getTransferencias = async () => {
  const { data } = await axios.get("http://localhost:3000/transferencias");
  $(".transferencias").html("");

  data.forEach((t) => {
    $(".transferencias").append(`
     <tr>
       <td> ${formatDate(t[3])} </td>
       <td> ${t[0]} </td>
       <td> ${t[1]} </td>
       <td> ${t[2]} </td>
     </tr>
   `);
  });
};



// Llamada a las funciones para obtener los usuarios y las transferencias
getUsuarios();
getTransferencias();




// Función para dar formato a la fecha
const formatDate = (date) => {
  const dateFormat = moment(date).format("L");
  const timeFormat = moment(date).format("LTS");
  return `${dateFormat} ${timeFormat}`;
};
formatDate();