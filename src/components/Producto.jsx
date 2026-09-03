export function Producto({ nombre, precio, disponible, onAgregar, onQuitar }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '15px',
        borderRadius: '8px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {precio < 50 && (
        <span style={{ color: 'orange', fontWeight: 'bold' }}>¡Oferta!</span>
      )}

      <h3 style={{ margin: 0 }}>{nombre}</h3>
      <p style={{ margin: 0 }}>Precio: ${precio}</p>

      {disponible ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>Disponible</span>
      ) : (
        <span style={{ color: 'red', fontWeight: 'bold' }}>Agotado</span>
      )}

      <div style={{ marginTop: 'auto' }}>
        {disponible ? (
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={onQuitar}
              style={{
                padding: '8px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              -
            </button>

            <button
              onClick={onAgregar}
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ) : (
          <button
            disabled
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'not-allowed',
            }}
          >
            No disponible
          </button>
        )}
      </div>
    </div>
  );
}
