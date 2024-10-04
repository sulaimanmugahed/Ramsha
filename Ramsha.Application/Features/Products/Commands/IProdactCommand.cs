

namespace Ramsha.Application.Features.Products.Commands;

public interface IProductCommand
{
   public string Name { get; set; }
   public string Description { get; set; }
   public decimal Price { get; set; }
}
