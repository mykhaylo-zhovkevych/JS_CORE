import React from "react";

// Composition Wrapper with children
function Card({ title, children, footer }) {
  return (
    <div
      style={{
        border: "1px solid #ededf1",
        borderRadius: 12,
        padding: 12,
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          alignItems: "baseline",
        }}
      >
        <strong>{title}</strong>
      </div>

      <div style={{ marginTop: 10 }}>{children}</div>

      {footer ? (
        <div
          style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: "1px solid #ededf1",
          }}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}

// Composition with props
function TwoColumn({ left, right }) {
  return (
    <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// Inheritance (rarely used in React, but shown here intentionally)
class BaseButton extends React.Component {
  // "hook" method that child classes can override
  getVariantStyle() {
    return { background: "#111", color: "white", border: "1px solid #111" };
  }

  render() {
    const { children, onClick } = this.props;
    const style = this.getVariantStyle();

    return (
      <button
        onClick={onClick}
        style={{...style, padding: "8px 10px", borderRadius: 10, cursor: "pointer", fontSize: 16, }}
        type="button"
      >
        {children}
      </button>
    );
  }
}

// Here the override behavior (style) but reuse base render()
class DangerButton extends BaseButton {
  getVariantStyle() {
    return { background: "#b00020", color: "white", border: "1px solid #b00020",
    };
  }
}

export default function CompositionVsInheritance() {
  return (
    <div>
      <h2>Composition vs. Inheritance</h2>

      <div className="grid">
        <div className="panel">
          <h3>1) Composition: Wrapper + children</h3>

          <Card
            title="Card (Wrapper)"
            footer={
              <span className="muted">
                The footer is optional and is passed as a prop.
              </span>
            }
          >
            <p className="muted" style={{ margin: 0 }}>
              Everything inside here comes from <code>children</code>. This makes
              the Card flexible: you can “plug in” any content you want.
            </p>
          </Card>
        </div>

        <div className="panel">
          <h3>2) Composition: Props </h3>

          <Card
            title="TwoColumn"
            footer={
              <span className="muted">Left/Right are Slots passed as Props.</span>
            }
          >
            <TwoColumn
              left={<div className="muted">Left Slot: e.g. Navigation</div>}
              right={<div className="muted">Right Slot: e.g. Content</div>}
            />
          </Card>
        </div>

        <div className="panel">
          <h3>3) Inheritance: extends (intentionally shown as counter-example)</h3>

          <div className="row">
            <BaseButton onClick={() => alert("BaseButton")}>
              BaseButton
            </BaseButton>
            <DangerButton onClick={() => alert("DangerButton")}>
              DangerButton
            </DangerButton>
          </div>

          <p className="muted" style={{ marginTop: 10 }}>
            Here inheritance: <code>DangerButton</code> inherits the
            rendering from <code>BaseButton</code> and only overrides one method
            (<code>getVariantStyle()</code>).
          </p>

          <p className="muted">
            In React, specialization is usually solved via props (e.g.{" "}
            <code>&lt;Button variant="danger" /&gt;</code>) or wrapper components,
            not via <code>extends</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
