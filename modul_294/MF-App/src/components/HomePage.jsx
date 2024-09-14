function HomePage() {
  return (
    <section className="home-page">
      <div className="welcome-container">
        <h1>Willkommen auf unserer Seite</h1>
        <p>Hier kannst du Fragen stellen und die von anderen sehen.</p>
        <div className="intro">
          <h2>Einführung</h2>
          <p>
            Wir freuen uns, dass du hier bist! Nutze die Navigation, um durch
            die Seite zu kommen und deine Fragen zu stellen. Unsere Community
            ist hier, um dir zu helfen!
          </p>
        </div>
        <div className="action-buttons">
          <button onClick={() => alert("Fragen stellen")}>
            Fragen stellen
          </button>
          <button onClick={() => alert("Fragen durchsuchen")}>
            Fragen durchsuchen
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
