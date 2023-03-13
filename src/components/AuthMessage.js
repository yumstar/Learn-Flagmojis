import Enum from 'enum'
/** @jsxImportSource theme-ui */
import { messageStyles } from "@/styles/authenticationStyles";
import { Text } from "theme-ui";
export default function AuthMessage({type,children}) {
    const typesEnum = new Enum({'SUCCESS': 'success', 'FAILURE': 'failure'})
    const typeMessageStyles = typesEnum.get(type) == 'success'? {...messageStyles, borderColor: 'green'}: {...messageStyles, borderColor: 'red'};
  return (<div className="auth-messsage" sx={typeMessageStyles}>
    <Text className="auth-message-icon" sx={{pr: 2}}>{typesEnum.get(type) == 'success'? "✅" :  "❗"}</Text>
    <Text className="auth-message-text" variant={typesEnum.get(type) == 'success'? "messageSuccess" :  "messageError"}>{children}</Text>
</div>
)
}