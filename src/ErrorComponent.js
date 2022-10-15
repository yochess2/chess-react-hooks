import React, { useContext, createContext } from 'react'

export const SetErrorContext = createContext()

const ErrorComponent = ({error}) => {
    const setErrorContext = useContext(SetErrorContext)

    return (
        <div className="alert alert-danger alert-dismissible fade show mb-0 mt-2" role="alert">
            <strong>Error!</strong>{" "}{error.message}.
            <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="alert" 
                aria-label="Close" 
                onClick={() => setErrorContext({ value: false, type: "", message: "" })}
            />
        </div>
    )
}

// function isEqual(prevError, nextError) {
//     let isSame = true
//     for (const key in prevError) {
//         if (prevError[key] === nextError[key]) isSame = false
//     }
//     return isSame
// }

export default ErrorComponent