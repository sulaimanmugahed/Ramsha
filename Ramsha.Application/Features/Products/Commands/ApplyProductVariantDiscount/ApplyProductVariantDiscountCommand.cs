// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Ramsha.Application.Wrappers;
// using Ramsha.Domain.Products;
// using Ramsha.Domain.Products.Enums;
// using MediatR;

// namespace Ramsha.Application.Features.Products.Commands.ApplyProductVariantDiscount;

// public class ApplyProductVariantDiscountCommand : IRequest<BaseResult>
// {
//     public Guid ProductId { get; set; }
//     public Guid ProductVariantId { get; set; }
//     public DiscountType Type { get; set; }
//     public decimal Value { get; set; }
//     public DateTime StartDate { get; set; }
//     public DateTime EndDate { get; set; }

// }
