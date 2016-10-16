interface IAccount {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;

    SignUp(userName, email, password, confirmPassword);
    SignIn(email, password);
}