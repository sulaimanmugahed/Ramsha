using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Orders.Entities;
using MediatR;
using Ramsha.Application.Services;
using Ramsha.Domain.Baskets.Entities;
using Ramsha.Application.Contracts.Identity.UserInterfaces;

namespace Ramsha.Application.Features.Orders.Commands.CreateOrder;

public class CreateOrderCommandHandler(
    IBasketRepository basketRepository,
    IGeocodingService geocodingService,
    IUnitOfWork unitOfWork,
    IUserService userService,
    ICustomerRepository customerRepository,
    IAuthenticatedUserService authenticatedUser,
    IOrderRepository orderRepository,
    DeliveryFeeService deliveryFeeService
) : IRequestHandler<CreateOrderCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var customer = await customerRepository
        .GetAsync(x => x.Username == authenticatedUser.UserName);

        if (customer is null)
            return new Error(ErrorCode.ErrorInIdentity);


        var basket = await basketRepository.GetDetail(authenticatedUser.UserName);
        if (basket is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        var order = Order.Create(customer.Id, request.ShippingAddress);


        var itemsGroups = basket.Items.GroupBy(x => x.InventoryItem.Supplier);


        List<FulfillmentRequest> fulfillmentRequests = [];

        foreach (var group in itemsGroups)
        {
            var supplier = group.Key;
            var supplierAddress = await userService.GetUserAddress(supplier.Username);
            if (supplierAddress is null)
            {
                throw new Exception("supplier should has address");
            }

            var supplierCoordinates = (supplierAddress.Latitude, supplierAddress.Longitude);
            if (supplierAddress is null)
            {
                throw new Exception("supplier should has address");
            }

            decimal fulfillmentFee = 0;
            List<OrderItem> orderItems = [];
            foreach (var supplierItem in group)
            {

                var inventoryItem = supplierItem.InventoryItem;
                if (inventoryItem is null)
                    return new Error(ErrorCode.RequestedDataNotExist, "one or more item was not found");

                var itemOrdered = new ProductItemOrdered(
                    inventoryItem.Id,
                    inventoryItem.ProductName,
                    inventoryItem.InventorySKU,
                    inventoryItem.ImageUrl
                );

                var orderItem = new OrderItem(order.Id,itemOrdered, inventoryItem.FinalPrice, supplierItem.Quantity);
                orderItems.Add(orderItem);
                inventoryItem.DecreaseQuantity(supplierItem.Quantity);

                var itemWight = supplierItem.InventoryItem.ProductVariant.CalculateShippingWeight(supplierItem.Quantity);
                var distance = geocodingService.CalculateDistance(supplierCoordinates, (request.ShippingAddress.Latitude, request.ShippingAddress.Longitude));
                var deliveryFee = deliveryFeeService.CalculateDeliveryFee(itemWight, distance);
                fulfillmentFee += deliveryFee;
            }
            var fulfillmentRequest = FulfillmentRequest.Create(supplier.Id, orderItems, fulfillmentFee);
            fulfillmentRequests.Add(fulfillmentRequest);
        }

        order.SetFulfillmentRequests(fulfillmentRequests);
        
        await orderRepository.AddAsync(order);
        basketRepository.Delete(basket);
        await unitOfWork.SaveChangesAsync();

        return order.Id.Value.ToString();
    }
}
