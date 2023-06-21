import crypto from 'crypto'

// Los resultados irian en este sentido
// {
//     salt: '2374edd7c570c152c767bf45013fdcca',
//     reuslt_crypto: <Buffer 89 48 09 e8 70 ab e1 28 bc 28 7d 19 43 bb 67 fa 67 4a 18 7d 55 91 67 57 3d 9d 
//     b7 03 39 02 9c f8 5f 18 02 32 2a be af ea f8 ed 08 64 60 a4 d4 05 90 00 ... 14 more bytes>
// }

export function hashPassword(password: String){
    const password_buffer = Buffer.from(password);
    console.log(password_buffer)
    const salt = crypto.randomBytes(16).toString('hex');
    const reuslt_crypto = crypto.pbkdf2Sync( password_buffer, salt, 1000, 64, 'sha512' ).toString('hex');

    return {salt, reuslt_crypto}
}

// hashPassword(''); 


// APUNTES:
// crypto.randomBytes(16): Genera una secuencia de bytes aleatorios de longitud 16. Los bytes aleatorios se generan utilizando un generador criptográficamente seguro. La longitud de 16 bytes (128 bits) se utiliza comúnmente para generar una sal segura.
// .toString('hex'): Luego de obtener los bytes aleatorios, se llama al método toString() con el argumento 'hex' para convertir los bytes en una representación hexadecimal legible como una cadena de caracteres.
