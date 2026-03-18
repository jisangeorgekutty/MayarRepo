using Mayar.Api.Common;
using Mayar.Api.DTOs;
using Mayar.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mayar.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(IProductService productService) : ControllerBase
    {
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var products = await productService.GetAllAsync();
            return Ok(new ApiResponse<List<ProductDto>> { Success = true, Message = "Products retrieved successfully.", Data = products });
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound(new ApiResponse<object> { Success = false, Message = "Product not found." });
            }
            return Ok(new ApiResponse<ProductDto> { Success = true, Message = "Product retrieved successfully.", Data = product });
        }

        [HttpGet("get-by-slug/{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var product = await productService.GetBySlugAsync(slug);
            if (product == null)
            {
                return NotFound(new ApiResponse<object> { Success = false, Message = "Product not found." });
            }
            return Ok(new ApiResponse<ProductDto> { Success = true, Message = "Product retrieved successfully.", Data = product });
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] ProductDto productDto)
        {
            var product = await productService.CreateAsync(productDto);
            return CreatedAtAction(nameof(GetById), new { id = product.Id },
                new ApiResponse<ProductDto>
                {
                    Success = true,
                    Message = "Product created successfully.",
                    Data = product
                });
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromForm] ProductDto productDto)
        {
            var product = await productService.UpdateAsync(id, productDto);
            if (product == null)
            {
                return NotFound(new ApiResponse<ProductDto> { Success = false, Message = "Product not found." });
            }
            return Ok(new ApiResponse<ProductDto> { Success = true, Message = "Product updated successfully.", Data = product });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await productService.DeleteAsync(id);
            if (!result)
            {
                return NotFound(new ApiResponse<object> { Success = false, Message = "Product not found." });
            }
            return Ok(new ApiResponse<object> { Success = true, Message = "Product deleted successfully.", Data = result });
        }
    }
}
