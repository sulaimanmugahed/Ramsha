using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Ramsha.Domain.Baskets.Entities;
using Ramsha.Domain.Settings;
using Ramsha.Domain.Suppliers;

namespace Ramsha.Application.Services;

public class DeliveryFeeService(IOptionsSnapshot<DeliveryFeeSettings> settings)
{
    public decimal CalculateDeliveryFee(decimal shippingWeight, double distance, bool isExpress = false)
    {
        decimal totalFee = settings.Value.BaseDeliveryFee;
        totalFee += shippingWeight * settings.Value.WeightRate;
        totalFee += (decimal)distance * settings.Value.DistanceRate;

        if (isExpress)
        {
            totalFee += settings.Value.ExpressSurcharge;
        }

        return totalFee;
    }
}
