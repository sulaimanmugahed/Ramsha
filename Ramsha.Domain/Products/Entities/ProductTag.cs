using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Products.Entities;

public class ProductTag
{
    public ProductId ProductId { get; set; }
    public Product Product { get; set; }


    public ProductTag()
    {

    }
    public ProductTag(Product product, Tag tag)
    {
        Product = product;
        Tag = tag;
    }

    public TagId TagId { get; set; }
    public Tag Tag { get; set; }
}

