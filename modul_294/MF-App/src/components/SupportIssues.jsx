import mapImage from '../assets/map.png';
function SupportIssues() {
  return (
    <div className="support-issues">
      <h1 className="support-headline">
        <b>Willkommen auf der Support- und Issue-Seite</b>
      </h1>
      <h2 className="support-headline">Anleitung zur Erstellung eines Tags</h2>
      <ol className="support-list">
        <li>1. Schritt zur Erstellung eines Tags</li>
        <li>2. Weiterer Schritt</li>
        <li>3. Noch ein Schritt</li>
        <li>4. Abschliessender Schritt</li>
      </ol>
      <div className="support">
        Für weitere Fragen oder Probleme können Sie entweder Mykhaylo Zhovkevych
        oder Florian Huber fragen.
      </div>
      <h3 className="support-headline">
        <b>Impressum:</b>
      </h3>
      <div className="support">MF GmbH</div>
      <div className="support">Oberer Graben 26</div>
      <img src={mapImage} alt="404 Map" />
      <div className="support">9000 St.Gallen</div>
    </div>
  );
}

export default SupportIssues;
