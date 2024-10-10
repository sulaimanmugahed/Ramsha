using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Products.Entities;


public class Rating
{
    public RatingId Id { get; set; }
    public decimal Value { get; set; }
    public string RatingBy { get; set; }
    public string Review { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public ProductId ProductId { get; set; }

    public Rating(decimal value, ProductId productId, string ratingBy, string review = "")
    {
        if (value < 0 || value > 5)
        {
            return;
        }

        Id = new RatingId(Guid.NewGuid());
        Value = value;
        Review = review;
        ProductId = productId;
        RatingBy = ratingBy;
    }

    public void SetVariant(ProductId productId)
    {
        ProductId = productId;
    }

}

