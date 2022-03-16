import Button from "./Button"

const Header = ({ onAdd, showAdd }) => {
    return (
        <header className="header">
            <h1>Task Manager</h1>
            <Button 
                color={showAdd ? 'Black' : 'Green'} 
                text={showAdd ? 'Close' : 'Add'} 
                onClick={onAdd}
            />
        </header>
    )
}

export default Header