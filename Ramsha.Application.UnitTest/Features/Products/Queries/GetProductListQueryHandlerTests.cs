using FluentAssertions;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Features.Products.Queries.GetProductList;
using Ramsha.Application.UnitTest.Mocks;
using Moq;


namespace Ramsha.Application.UnitTest.Features.Products.Queries;
public class GetProductListQueryHandlerTests
{

	private readonly Mock<IProductRepository> _mockProductRepo;
	public GetProductListQueryHandlerTests()
	{
		_mockProductRepo = MockProductRepository.GetProductRepository();
	}


	[Fact]
	public async Task Handel_Should_ReturnTrueBaseResultWithProductDtoList_When_GetProductListQueryRequested()
	{
		// Arrange
		var handler = new GetProductListQueryHandler(_mockProductRepo.Object);

		// Act
		var result = await handler.Handle(new GetProductListQuery(), CancellationToken.None);

		// Assert
		result.Data.Count.Should().Be(5);
		result.Success.Should().BeTrue();
	}

}
