namespace Ramsha.Domain.Inventory.Entities;

public class DeliveryFee
{
    public DeliveryFee(decimal fee)
    {
        Fee = fee;
    }

    public decimal Fee { get; private set; }
    public int? FreeQuantityThreshold { get; private set; }
    public int? QuantityIncrementThreshold { get; private set; }
    public decimal? FreePriceThreshold { get; private set; }
    public double? DistanceIncrementThreshold { get; private set; }
    public double? FreeDistanceThreshold { get; private set; }


    public void SetQuantityIncrementThreshold(int quantityIncrementThreshold)
    {
        QuantityIncrementThreshold = quantityIncrementThreshold;
    }

    public void SetFreeQuantityThreshold(int freeQuantityThreshold)
    {
        FreeQuantityThreshold = freeQuantityThreshold;
    }

    public void SetDistanceIncrementThreshold(double distanceIncrementThreshold)
    {
        DistanceIncrementThreshold = distanceIncrementThreshold;
    }

    public void SetFreeDistanceThreshold(int freeDistanceThreshold)
    {
        FreeDistanceThreshold = freeDistanceThreshold;
    }


    public decimal CalculateTotalFee(double distanceInKm, int quantity, decimal orderPrice)
    {
        bool isFree = distanceInKm <= FreeDistanceThreshold
        || quantity >= FreeQuantityThreshold
        || orderPrice >= FreePriceThreshold;

        if (isFree) return 0;

        decimal distanceFee = CalculateFeePerDistance(distanceInKm, Fee);
        return CalculateFeePerQuantity(quantity, distanceFee);
    }

    private decimal CalculateFeePerDistance(double distanceInKm, decimal fee)
    {
        if (DistanceIncrementThreshold.HasValue && DistanceIncrementThreshold.Value > 0)
        {
            var increments = (int)(distanceInKm / DistanceIncrementThreshold.Value);
            return increments * fee;
        }
        return fee;
    }


    private decimal CalculateFeePerQuantity(int quantity, decimal fee)
    {
        if (QuantityIncrementThreshold.HasValue && QuantityIncrementThreshold.Value > 0)
        {
            var increments = quantity / QuantityIncrementThreshold.Value;
            return increments * fee;
        }
        return fee;
    }





}
