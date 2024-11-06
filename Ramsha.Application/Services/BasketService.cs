using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Dtos.Common;
using Ramsha.Domain.Baskets.Entities;
using Ramsha.Domain.Common;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Application.Services;

public class BasketService(
IBasketRepository basketRepository,
IGeocodingService geocodingService,
IAuthenticatedUserService authenticatedUserService,
ICustomerRepository customerRepository,
IUserService userService,
DeliveryFeeService deliveryFeeService)
{
    public async Task<BasketDetailDto> GetBasketDeliveryFeeDetail()
    {
        var customerAddress = await userService.GetUserAddress(authenticatedUserService.UserName);
        if (customerAddress is null)
        {
            throw new Exception("customer should has address");
        }

        var basket = await basketRepository.GetDetail(authenticatedUserService.UserName);
        if (basket is null)
        {
            throw new Exception("customer is null");
        }

        var customerCoordinates = (customerAddress.Latitude, customerAddress.Longitude);

        var itemsGroups = basket.Items.GroupBy(x => x.InventoryItem.Supplier);

        List<BasketSupplierGroupDetailDto> supplierGroups = [];
        foreach (var group in itemsGroups)
        {
            var supplier = group.Key;
            var supplierAddress = await userService.GetUserAddress(supplier.Username);
            if (supplierAddress is null)
            {
                throw new Exception("supplier should has address");
            }
            var supplierCoordinates = (supplierAddress.Latitude, supplierAddress.Longitude);
            List<BasketItemDetailDto> supplierItems = [];
            foreach (var supplierItem in group)
            {
                var itemWight = supplierItem.InventoryItem.ProductVariant.CalculateShippingWeight(supplierItem.Quantity);
                var distance = geocodingService.CalculateDistance(supplierCoordinates, customerCoordinates);
                var deliveryFee = deliveryFeeService.CalculateDeliveryFee(itemWight, distance);



                var itemDetail = new BasketItemDetailDto(
                    supplierItem.InventoryItemId.Value,
                    supplierItem.InventoryItem.ProductName,
                    supplierItem.InventoryItem.InventorySKU,
                    supplierItem.InventoryItem.ImageUrl,
                    supplierItem.InventoryItem.RetailPrice,
                    supplierItem.InventoryItem.FinalPrice,
                    supplierItem.InventoryItem.FinalPrice * supplierItem.Quantity + deliveryFee,
                    supplierItem.Quantity,
                    deliveryFee
                );

                supplierItems.Add(itemDetail);
            }

            var supplierGroup = new BasketSupplierGroupDetailDto(
                supplier.Id.Value,
                supplier.Username,
                supplierItems.Sum(x => x.TotalPrice),
                supplierItems.Sum(x => x.DeliveryFee),
                supplierItems
            );

            supplierGroups.Add(supplierGroup);
        }

        return new BasketDetailDto(
            supplierGroups,
            supplierGroups.Sum(x => x.TotalDeliveryFees),
            supplierGroups.Sum(x => x.TotalPrice)
        );
    }


    public decimal CalculateFulfillmentRequestDeliveryFees(Address supplierAddress, Address customerAddress, List<BasketItem> items)
    {
        decimal totalFee = 0;
        var supplierCoordinates = (supplierAddress.Latitude, supplierAddress.Longitude);
        var customerCoordinates = (customerAddress.Latitude, customerAddress.Longitude);

        foreach (var supplierItem in items)
        {
            var itemWight = supplierItem.InventoryItem.ProductVariant.CalculateShippingWeight(supplierItem.Quantity);
            var distance = geocodingService.CalculateDistance(supplierCoordinates, customerCoordinates);
            var deliveryFee = deliveryFeeService.CalculateDeliveryFee(itemWight, distance);
            totalFee += deliveryFee;
        }
        return totalFee;
    }




    public async Task<decimal> CalculateTotalDeliveryFees(Basket basket, Address customerAddress)
    {
        decimal totalFee = 0;


        var customerCoordinates = (customerAddress.Latitude, customerAddress.Longitude);

        var itemsGroups = basket.Items.GroupBy(x => x.InventoryItem.Supplier);

        foreach (var group in itemsGroups)
        {
            var supplier = group.Key;
            var supplierAddress = await userService.GetUserAddress(supplier.Username);
            if (supplierAddress is null)
            {
                throw new Exception("supplier should has address");
            }
            var supplierCoordinates = (supplierAddress.Latitude, supplierAddress.Longitude);
            foreach (var supplierItem in group)
            {
                var itemWight = supplierItem.InventoryItem.ProductVariant.CalculateShippingWeight(supplierItem.Quantity);
                var distance = geocodingService.CalculateDistance(supplierCoordinates, customerCoordinates);
                var deliveryFee = deliveryFeeService.CalculateDeliveryFee(itemWight, distance);
                totalFee += deliveryFee;
            }
        }

        return totalFee;
    }
}
