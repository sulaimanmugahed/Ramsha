using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Persistence.Helpers;

public static class ProductQueriesExtensions
{
    public static IQueryable<Product> FilterByCategoryAndChildren(this IQueryable<Product> products, List<CategoryId> categoryIds)
    {
        if (products == null) throw new ArgumentNullException(nameof(products));


        return products.Where(product => categoryIds.Contains(product.CategoryId));
    }



}