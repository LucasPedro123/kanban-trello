import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  position: number;
  type: string;
}

const BestSellerSearch: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [siteId, setSiteId] = useState<string>('MLB'); // Site ID padrão, modifique conforme necessário
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>('seu_token_aqui'); // Adicione seu token de acesso

  const fetchBestSellers = async (siteId: string, categoryId: string, accessToken: string) => {
    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      const response = await fetch(
        `https://api.mercadolibre.com/highlights/${siteId}/category/${categoryId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data.content || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (category.trim() === '') {
      setError('Por favor, insira uma categoria.');
    } else {
      fetchBestSellers(siteId, category, accessToken);
    }
  };

  return (
    <div>
      <h1>Buscar Mais Vendidos por Categoria</h1>
      <input
        type="text"
        placeholder="Digite a categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div>Erro: {error}</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.position}: {product.id} ({product.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BestSellerSearch;
