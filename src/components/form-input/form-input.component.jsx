import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  //   console.log(otherProps);
  return (
    <div className="group">
      <input {...otherProps} className="form-input" />
      {label && (
        <label
          htmlFor={otherProps.name}
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
