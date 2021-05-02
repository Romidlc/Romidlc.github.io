import ButtonMaterial from '@material-ui/core/Button'; // use material Button

// This component should be generics because I'll use it on to many pages
const Button = (props) => {
  const { disabled, title, onClick, children, id } = props; 

  const customClick = (e) => {
    if (onClick) onClick(e);
  }; // onclick event functionality will be implemented on every component that used it 

  return (
    <ButtonMaterial
      className="buttonGeneric"
      disabled={disabled}
      onClick={customClick}
      id={id}
    >
      <span>{title}</span>
      {children}
    </ButtonMaterial>
  );
};

export default Button;
