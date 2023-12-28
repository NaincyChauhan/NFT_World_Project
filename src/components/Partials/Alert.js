import Swal from 'sweetalert2';
// import { createSelector } from "reselect";

// const Alert = () => {
    
// }

export function ajaxMessage(status, msg) {
    if (status == 1) {
        Swal.fire({
            icon: 'success',
            title: 'Success! 😊',
            text: msg,
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error! 😯',
            text: msg,
        });
    }
}

export function errorsHTMLMessage(msg) {
    Swal.fire({
        icon: 'error',
        title: 'Error! 😯',
        html: msg,
    });
}

export function infoHTMLMessage(msg) {
    Swal.fire({
        icon: 'info',
        title: 'Info! 😐',
        showDenyButton: true,
        showCancelButton: true,
        html: msg,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else if (result.isDenied) {
            return false;
        }
    });
}