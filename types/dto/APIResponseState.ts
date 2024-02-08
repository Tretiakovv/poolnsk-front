export type APIResponseState = "success" | "error" | "idle"

export type SnackbarState = {
    state : APIResponseState,
    message : string
}

export const defaultSnackbarState : SnackbarState = {
    state : "idle",
    message : "Default snackbar message"
}