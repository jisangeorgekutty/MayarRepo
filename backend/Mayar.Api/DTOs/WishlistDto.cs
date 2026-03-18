using System;

namespace Mayar.Api.DTOs;

public class WishlistDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Guid UserId { get; set; }

    public DateTime CreatedAt { get; set; }
}
