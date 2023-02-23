/** @jsxImportSource theme-ui */
import { errorStyles } from "@/styles/authenticationStyles";
import { Text, Box } from "theme-ui";
export default function AuthError({children}) {
    return (<div className="auth-error" sx={errorStyles}>
        <Text className="auth-error-icon">⚠️</Text>
        <Text variant="validationError">{children}</Text>
    </div>
    )
}