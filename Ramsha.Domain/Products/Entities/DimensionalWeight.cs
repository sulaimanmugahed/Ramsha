namespace Ramsha.Domain.Products.Entities;

public class DimensionalWeight
{
    public decimal Length { get; }
    public decimal Width { get; }
    public decimal Height { get; }
    public decimal DimensionalFactor { get; }

    private DimensionalWeight()
    {

    }

    public DimensionalWeight(decimal length, decimal width, decimal height, decimal dimensionalFactor = 5000)
    {
        Length = length;
        Width = width;
        Height = height;
        DimensionalFactor = dimensionalFactor;
    }

    public decimal Calculate()
    {
        var dims = Length * Width * Height;
        return dims > 0 ? dims / DimensionalFactor : 0;
    }
}




