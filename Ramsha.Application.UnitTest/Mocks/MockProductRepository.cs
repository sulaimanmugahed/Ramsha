using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.UnitTest.DataGenretors;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Moq;


namespace Ramsha.Application.UnitTest.Mocks;
public static class MockProductRepository
{
    public static Mock<IProductRepository> GetProductRepository()
    {
        var products = ProdutsDataGenerator.GenerateProductList(5);
        var mockRepo = new Mock<IProductRepository>();

        mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(products);

        mockRepo.Setup(r=> r.GetByIdAsync(It.IsAny<ProductId>()))
            .ReturnsAsync((ProductId productId) =>
            {
                return products.FirstOrDefault(x => x.Id == productId);
            });

        mockRepo.Setup(r => r.AddAsync(It.IsAny<Product>())).ReturnsAsync((Product product) =>
        {
            products.Add(product);
            return product;
        });

        return mockRepo;
    }

}
