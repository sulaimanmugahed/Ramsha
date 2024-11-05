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
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork,
    IUserService userService,
    ICustomerRepository customerRepository,
    IAuthenticatedUserService authenticatedUser,
    IOrderRepository orderRepository,
    BasketService basketService,
    DeliveryFeeService deliveryFeeCalculator
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

        List<OrderItem> orderItems = [];

        foreach (var item in basket.Items)
        {
            var inventoryItem = item.InventoryItem;
            if (inventoryItem is null)
                return new Error(ErrorCode.RequestedDataNotExist, "one or more item was not found");

            var itemOrdered = new ProductItemOrdered(
                inventoryItem.Id,
                inventoryItem.SupplierId,
                inventoryItem.ProductName,
                inventoryItem.InventorySKU,
                inventoryItem.ImageUrl
            );

            var orderItem = new OrderItem(itemOrdered, inventoryItem.FinalPrice, item.Quantity);
            orderItems.Add(orderItem);
            inventoryItem.DecreaseQuantity(item.Quantity);
        }

        var deliveryFee = await basketService.CalculateTotalDeliveryFees(basket, request.ShippingAddress);

        var order = Order.Create(customer.Id, orderItems, request.ShippingAddress, deliveryFee);
        await orderRepository.AddAsync(order);
        basketRepository.Delete(basket);

        await unitOfWork.SaveChangesAsync();

        return order.Id.Value.ToString();
    }
}
