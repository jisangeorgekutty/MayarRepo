using Mayar.Api.Common;
using Mayar.Api.DTOs;
using Mayar.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Mayar.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductSizeController(IProductSizeService service) : ControllerBase
{
    [HttpGet("get-all")]
    public async Task<IActionResult> GetAll()
    {
        var items = await service.GetAllAsync();
        return Ok(new ApiResponse<List<ProductSizeDto>> { Success = true, Message = "Sizes retrieved successfully.", Data = items });
    }

    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var item = await service.GetByIdAsync(id);
        if (item == null)
        {
            return NotFound(new ApiResponse<object> { Success = false, Message = "Size not found." });
        }
        return Ok(new ApiResponse<ProductSizeDto> { Success = true, Message = "Size retrieved successfully.", Data = item });
    }

    [HttpGet("get-by-product/{productId}")]
    public async Task<IActionResult> GetByProductId(Guid productId)
    {
        var items = await service.GetByProductIdAsync(productId);
        return Ok(new ApiResponse<List<ProductSizeDto>> { Success = true, Message = "Sizes retrieved successfully.", Data = items });
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] ProductSizeDto dto)
    {
        var item = await service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = item.Id },
            new ApiResponse<ProductSizeDto> { Success = true, Message = "Size created successfully.", Data = item });
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Guid id, [FromForm] ProductSizeDto dto)
    {
        var item = await service.UpdateAsync(id, dto);
        if (item == null)
        {
            return NotFound(new ApiResponse<object> { Success = false, Message = "Size not found." });
        }
        return Ok(new ApiResponse<ProductSizeDto> { Success = true, Message = "Size updated successfully.", Data = item });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await service.DeleteAsync(id);
        if (!result)
        {
            return NotFound(new ApiResponse<object> { Success = false, Message = "Size not found." });
        }
        return Ok(new ApiResponse<object> { Success = true, Message = "Size deleted successfully." });
    }
}
