import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  // const FormInput = ({ label, inputOptions }) => {
  //   console.log(otherProps);
  //   console.log(inputOptions);
  return (
    <div className="group">
      <input {...otherProps} className="form-input" />
      {/* <input {...inputOptions} className="form-input" /> */}
      {label && (
        <label
          htmlFor={otherProps.name}
          //   htmlFor={inputOptions.name}
          className={`${
            otherProps.value.length ? "shrink" : ""
            // inputOptions.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
