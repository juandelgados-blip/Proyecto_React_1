import { Carrito } from './Carrito';

export function Header({ usuario, estaConectado, cantidadCarrito }) {
  return (
    <header
      style={{
        padding: '15px 20px',
        background: '#282c34',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Mi Tienda en React</h1>
        <p style={{ margin: '5px 0 0 0' }}>
          {estaConectado
            ? `Bienvenido/a, ${usuario}!`
            : 'Por favor, inicia sesión.'}
        </p>
      </div>

      <Carrito cantidad={cantidadCarrito} />
    </header>
  );
}
