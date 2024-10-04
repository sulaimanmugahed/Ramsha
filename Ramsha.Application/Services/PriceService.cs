
// using Ramsha.Application.Contracts;
// using Ramsha.Application.Contracts.Persistence;
// using Ramsha.Domain.Products;
// using Ramsha.Domain.Products.Entities;
// using Ramsha.Domain.Products.Enums;
// using Ramsha.Domain.Suppliers;

// namespace Ramsha.Application.Services;

// public class PriceService(
//  IDiscountRepository discountRepository,
//  IProductPriceRepository productPriceRepository)
//  : IPriceService
// {




//     public async Task<decimal> CalculateFinalPrice(ProductId productId, SupplierId supplierId, decimal purchaseAmount, string couponCode)
//     {
//         var productPrice = await productPriceRepository.GetProductPriceAsync(productId, supplierId);
//         decimal price = productPrice!.Value;

//         var discount = await GetAppliedDiscount(productId, supplierId, couponCode);
//         if (discount is null || discount.MinimumPurchaseAmount > purchaseAmount)
//             return price;

//         return ApplyDiscount(price, discount.Value, discount.Type);
//     }





//     private decimal ApplyDiscount(decimal price, decimal discountValue, DiscountType discountType)
//     {
//         return discountType switch
//         {
//             DiscountType.Percentage => price - (price * discountValue / 100),
//             DiscountType.FixedAmount => price - discountValue,
//             _ => price
//         };

//     }



//     private async Task<Discount?> GetAppliedDiscount(ProductId productId, SupplierId supplierId, string couponCode)
//     {
//         var currentDate = DateTime.UtcNow;
//         // return await discountRepository.GetAsync(d =>
//         //         (d.ProductId == productId || d.SupplierId == supplierId) &&
//         //         d.StartDate <= currentDate &&
//         //         d.EndDate >= currentDate &&
//         //         d.CouponCode == couponCode);
//         return null;
//     }


// }
