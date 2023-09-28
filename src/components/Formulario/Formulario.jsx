"use client"

import React, { useState } from 'react';
import { useForm, Controller, } from 'react-hook-form';

export default function ProductForm() {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [products, setProducts] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    setProducts([...products, data]);
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Formulário de Cadastro de Produto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="produto" className="block text-gray-600">
            Produto:
          </label>
          <Controller
            name="produto"
            control={control}
            defaultValue=""
            rules={{ required: 'O produto é obrigatório', minLength: { value: 3, message: 'O produto deve ter pelo menos 3 caracteres' } }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`w-full p-2 border ${
                  errors.produto ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              />
            )}
          />
          {errors.produto && (
            <p className="text-red-500 text-sm mt-1">{errors.produto.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="quantidade" className="block text-gray-600">
            Quantidade:
          </label>
          <Controller
            name="quantidade"
            control={control}
            defaultValue=""
            rules={{ required: 'A quantidade é obrigatória', min: { value: 1, message: 'A quantidade deve ser pelo menos 1' } }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`w-full p-2 border ${
                  errors.quantidade ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              />
            )}
          />
          {errors.quantidade && (
            <p className="text-red-500 text-sm mt-1">{errors.quantidade.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cadastrar Produto
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Produtos Cadastrados</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index} className="mb-2">
              <strong>Produto:</strong> {product.produto}, <strong>Quantidade:</strong> {product.quantidade}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
