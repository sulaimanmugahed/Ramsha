
// using Ramsha.Application.Contracts;
// using Ramsha.Application.Contracts.Persistence;
// using Ramsha.Application.Wrappers;
// using Ramsha.Domain.Products.Entities;
// using MediatR;

// namespace Ramsha.Application.Features.Products.Commands.ApplyProductVariantDiscount;

// public class ApplyProductVariantDiscountCommandHandler(
//     IProductRepository productRepository,
//     IUnitOfWork unitOfWork)
//      : IRequestHandler<ApplyProductVariantDiscountCommand, BaseResult>
// {
//     public async Task<BaseResult> Handle(ApplyProductVariantDiscountCommand request, CancellationToken cancellationToken)
//     {
//         var productVariant = await productRepository.GetProductVariant(
//             new Domain.Products.ProductId(request.ProductId),
//             new Domain.Products.ProductVariantId(request.ProductVariantId));
            
//         if (productVariant is null)
//             return new Error(ErrorCode.EmptyData);

//         var discount = Discount.Create(request.Value, request.StartDate, request.EndDate, request.Type);

//         productVariant.Discounts.Add(discount);

//         await unitOfWork.SaveChangesAsync();
//         return BaseResult.Ok();
//     }
// }
