import React  from 'react'

export const Dialog = ({handleCloseDialog, children}) => {
    return <div className={"dialog"} onClick={() => handleCloseDialog()}>
        <div className={"dialog-content"} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
}