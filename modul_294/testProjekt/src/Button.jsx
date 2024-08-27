function Button(param) {
  return (
    <>
      {/* das{} ist eine javasckipt code der ich muss ausführen  */}
      <button onClick={param.fun}>{param.name}</button>
    </>
  );
}

export default Button;
/* export default Button macht die Button-Komponente für andere Dateien zugänglich, damit sie in der App-Komponente importiert und verwendet werden kann. Dadurch kannst du die Buttons dynamisch und wiederverwendbar rendern. */
