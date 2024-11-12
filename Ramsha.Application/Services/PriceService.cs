
// using Ramsha.Application.Contracts;
// using Ramsha.Application.Contracts.Persistence;
// using Ramsha.Domain.Products;
// using Ramsha.Domain.Products.Entities;
// using Ramsha.Domain.Products.Enums;
// using Ramsha.Domain.Suppliers;

// namespace Ramsha.Application.Services;

// public class PriceService: IPriceService
// {
//     public async Task<decimal> CalculateFinalPrice(ProductId productId, SupplierId supplierId, decimal purchaseAmount, string couponCode)
//     {

//     }





//     private decimal ApplyDiscount(decimal price, decimal discountValue, DiscountType discountType)
//     {

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
