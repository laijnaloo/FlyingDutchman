// Function taken from: https://codepen.io/g13nn/pen/LhClg
function field_focus(field,email) {
    if(field.value == email)
    {
        field.value='';
    }
}
// Function taken from: https://codepen.io/g13nn/pen/LhClg

function field_blur(field,email){
    if(field.value == '')
    {
        field.value = email;
    }
}