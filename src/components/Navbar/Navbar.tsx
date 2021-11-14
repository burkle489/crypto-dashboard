import { AmplifySignOut } from "@aws-amplify/ui-react"

export const Navbar = () => {
    return (
        <div className='Navbar'>
            <h1>Financiall</h1>
            <AmplifySignOut />
        </div>
    )
}