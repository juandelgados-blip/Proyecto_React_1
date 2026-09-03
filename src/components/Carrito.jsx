export function Carrito({ cantidad }) {
  return (
    <div className="carrito-container">
      <span> Carrito:</span>
      <span className="carrito-badge">{cantidad}</span>
    </div>
  );
}
