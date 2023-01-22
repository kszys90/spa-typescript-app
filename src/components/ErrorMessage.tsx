type Props = {
    status: string,
}

export const ErrorMessage: React.FC<Props> = ({
    status
  }) => {
    function statusMessage(){
        switch (status) {
            case "400":
                return "Bad Request"
            case "401":
                return "Unauthorized"
            case "402":
                return "Payment Required"
            case "403":
                return "Forbidden"
            case "404":
                return "Not Found" 
            case "500":
                return "Internal Server Error"
            default:
                return "Network Error"
        }
    }
    return (
        <>
            <h2 className={'error--message'}>Error: {status}</h2>
            <h4 className={'error--message'}>{statusMessage()}</h4>
        </>
    )
  }

export {}




