export const AddAuthData = (data) => ({
    type: "SAVE_AUTH",
    payload: data,
});

export const AuthLogout = () => ({
    type: "RESET_AUTH",
});
