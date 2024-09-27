const SelectButton = ({ children, selected, onClick }) => {
    const selectButtonStyle = {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      width: "22%",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
    };
  
    return (
      <span onClick={onClick} style={selectButtonStyle}>
        {children}
      </span>
    );
  };
  
  export default SelectButton;
  