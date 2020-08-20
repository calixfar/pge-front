import Swal from 'sweetalert2';
export  const showErrorAlert = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Error...',
        text
    });
};    

export const showQuestionAlert = (callback) => {
    Swal.fire({
        title: 'Está seguro de realizar esta acción?',
        text: "No podrá revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
      }).then(({ value }) => {
        if (value) {
          Swal.fire({
              icon: 'success',
              title: 'Operación éxitosa!',
              text: 'La operación fue realizada con éxito'
          });
          callback();
        }
      })
}

export const ShowSuccessMessage = () => {
  Swal.fire({
    title: 'Operación Exitosa',
    text: 'La operación fue comletada con éxito',
    icon: 'success'
  })
}