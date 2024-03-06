export const splitText = text => {
  let newText = text;
  newText = text.split('\n').map((item, key) => {
    return (
      <>
        {item}
        <br />
      </>
    );
  });
  return newText;
};
