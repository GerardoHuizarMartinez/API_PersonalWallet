import AuthService from "./src/services/auth.service";
import UserModel from "./src/models/user.model";

async function testLogin() {
    const email = "gerardo-1297@hotmail.com"; // Cambia esto por un correo que tengas en tu base de datos
    const password = "1234567"; // Cambia esto por la contraseña correspondiente

    try {
        const user = await AuthService.login(email, password);
        console.log("Inicio de sesión exitoso:", user);
    } catch (e) {
        console.error("Error durante el inicio de sesión:", e);
    }
}

//testLogin();