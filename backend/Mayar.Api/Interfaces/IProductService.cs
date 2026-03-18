using System;
using Mayar.Api.DTOs;

namespace Mayar.Api.Interfaces;

public interface IProductService
{
    Task<List<ProductDto>> GetAllAsync();
    Task<ProductDto?> GetByIdAsync(Guid id);
    Task<ProductDto?> GetBySlugAsync(string slug);
    Task<ProductDto> CreateAsync(ProductDto productDto);
    Task<ProductDto?> UpdateAsync(Guid id, ProductDto productDto);
    Task<bool> DeleteAsync(Guid id);
}
