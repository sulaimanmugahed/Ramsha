namespace Ramsha.Domain.Settings;


public class DeliveryFeeSettings
{
    public decimal BaseDeliveryFee { get; set; }
    public decimal WeightRate { get; set; }
    public decimal DistanceRate { get; set; }
    public decimal ExpressSurcharge { get; set; }
}

