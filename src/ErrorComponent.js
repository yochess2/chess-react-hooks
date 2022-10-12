import React, { useContext, createContext, useRef } from 'react'

export const ErrorContext = createContext()

function ErrorComponent() {
    const errorContext = useContext(ErrorContext)
    const buttonEl = useRef(null)

    return (
        <div className="alert alert-danger alert-dismissible fade show mb-0 mt-sm-2" role="alert">
            <strong>Holy guacamole!</strong> {errorContext.error.message}.
            <button 
                ref={buttonEl}
                type="button" 
                className="btn-close" 
                data-bs-dismiss="alert" 
                aria-label="Close" 
                onClick={() => { errorContext.setError({
                    value: false, message: ""
                })}}/>
        </div>
    )
}

export default ErrorComponent