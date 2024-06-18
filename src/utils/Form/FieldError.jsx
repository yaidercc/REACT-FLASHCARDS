export const FieldError = ({errorMessage}) => {
  return (
     <span className={`${errorMessage ? "msg__error" : "hide"}`}>{errorMessage}</span>
  )
}
