

namespace Ramsha.Application.Dtos.Suppliers;

public class CreateSupplyRequestItemDto
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
