using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Orders.Entities;
using MediatR;

namespace Ramsha.Application.Features.Orders.Commands.CreateOrder;

public class CreateOrderCommandHandler(
    IBasketRepository basketRepository,
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork,
    ICustomerRepository customerRepository,
    IAuthenticatedUserService authenticatedUser,
    IOrderRepository orderRepository
) : IRequestHandler<CreateOrderCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var customer = await customerRepository
        .GetAsync(x => x.Username == authenticatedUser.UserName
        , x => x.Address);

        if (customer is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var basket = await basketRepository.FindByBuyer(authenticatedUser.UserName);
        if (basket is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        List<OrderItem> orderItems = [];

        foreach (var item in basket.Items)
        {
            var inventoryItem = await inventoryItemRepository.GetAsync(
                x => x.Id == item.InventoryItemId,
                x => x.Stocks
            );

            if (inventoryItem is null)
                return new Error(ErrorCode.RequestedDataNotExist, "one or more item was not found");

            var itemOrdered = new ProductItemOrdered(
                inventoryItem.Id,
                inventoryItem.ProductName,
                inventoryItem.InventorySKU,
                inventoryItem.ImageUrl
            );

            var orderItem = new OrderItem(itemOrdered, inventoryItem.FinalPrice, item.Quantity);
            orderItems.Add(orderItem);
            inventoryItem.DecreaseQuantity(item.Quantity);
        }

        var order = Order.Create(customer.Id, orderItems, request.ShippingAddress, 50);
        await orderRepository.AddAsync(order);
        basketRepository.Delete(basket);

        if (request.SaveAddress)
        {
            customer.SetAddress(new Domain.Customers.Entities.CustomerAddress
            {
                FullName = request.ShippingAddress.FullName,
                Address1 = request.ShippingAddress.Address1,
                Address2 = request.ShippingAddress.Address2,
                City = request.ShippingAddress.City,
                Country = request.ShippingAddress.Country,
                State = request.ShippingAddress.State,
                Zip = request.ShippingAddress.Zip,
            });
        }

        await unitOfWork.SaveChangesAsync();

        return order.Id.Value.ToString();
    }
}
