using Bogus;
using FluentAssertions;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Exceptions;
using Ramsha.Application.Features.Products.Queries.GetProductById;
using Ramsha.Application.Features.Products.Queries.GetProductList;
using Ramsha.Application.UnitTest.Mocks;
using Ramsha.Domain.Products;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.UnitTest.Features.Products.Queries;
public class GetProductByIdQueryHandlerTests
{
	private readonly Mock<IProductRepository> _mockProductRepo;
	public GetProductByIdQueryHandlerTests()
	{
		_mockProductRepo = MockProductRepository.GetProductRepository();
	}


	[Fact]
	public async Task Handel_Should_ReturnTrueBaseResultWithOneProductDto_When_GetProductByIdQueryRequesttedWithExistProductId()
	{
		// Arrange
		var products =await _mockProductRepo.Object.GetAllAsync();
		var handler = new GetProductByIdQueryHandler(_mockProductRepo.Object);

		// Act
		var result = await handler.Handle(new GetProductByIdQuery { Id = products.First().Id.Value }, CancellationToken.None);

		// Assert
		result.Data.Should().NotBeNull();
		result.Success.Should().BeTrue();
	}


	[Fact]
	public async Task Handel_Should_ThrowApplicationNotFoundException_When_GetProductByIdQueryRequestedWithIdNotInProducts()
	{
		// Arrange
		var handler = new GetProductByIdQueryHandler(_mockProductRepo.Object);

		// Act
		Func<Task> act = async () =>  await handler.Handle(new GetProductByIdQuery { Id = Guid.NewGuid() }, CancellationToken.None); 

		// Assert
		await act.Should().ThrowAsync<ApplicationNotFoundException>();
	}
}
