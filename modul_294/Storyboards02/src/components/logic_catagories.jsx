// what i need some function that uses the event-object 

function LogicCatagories ({ onCategoryChange }) {

    /*In React verwenden wir die return-Anweisung innerhalb von Funktionskomponenten, um das JSX zurückzugeben
    Das return-Statement ist entscheidend, da es bestimmt, was tatsächlich auf dem Bildschirm angezeigt wird. */
    return (

        <div>
            <h2>Wähle eine Kategorie</h2>
            <button onClick={() => onCategoryChange("Science")}>Wissenschaft</button>
            <button onClick={() => onCategoryChange("Math")}>Mathematik</button>
            <button></button>

            <button></button>

        </div>

    );

}


export default LogicCatagories;